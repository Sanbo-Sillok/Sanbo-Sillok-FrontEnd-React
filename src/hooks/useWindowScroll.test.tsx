import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useWindowScroll from './useWindowScroll';

const mockScroll = (scrollY: number, innerHeight: number, scrollHeight: number) => {
  Object.defineProperty(window, 'scrollY', {
    value: scrollY,
    writable: true,
  });
  Object.defineProperty(window, 'innerHeight', {
    value: innerHeight,
    writable: true,
  });
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    writable: true,
  });
};

describe('useWindowScroll', () => {
  it('스크롤을 아래로 내릴 때 isScrollDown이 true가 됨', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>;

    mockScroll(0, 800, 1600); // 초기 스크롤 위치 설정
    const { result } = renderHook(() => useWindowScroll(), { wrapper });

    act(() => {
      mockScroll(500, 800, 1600); // 아래로 스크롤
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isScrollDown).toBe(true);
  });

  it('스크롤을 위로 올릴 때 isScrollDown이 false가 됨', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>;

    mockScroll(500, 800, 1600); // 초기 스크롤 위치 설정
    const { result } = renderHook(() => useWindowScroll(), { wrapper });

    act(() => {
      mockScroll(0, 800, 1600); // 위로 스크롤
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isScrollDown).toBe(false);
  });

  it('페이지 이동을 하면 isScrollDown이 false가 됨', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/', '/new-page']}>{children}</MemoryRouter>
    );

    mockScroll(500, 800, 1600); // 초기 스크롤 위치 설정
    const { result, rerender } = renderHook(() => useWindowScroll(), { wrapper });

    act(() => {
      // 라우터 변경
      rerender();
    });

    expect(result.current.isScrollDown).toBe(false);
  });

  it('currentPosition이 0보다 작을 경우 isScrollDown을 업데이트 하지 않음', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>;

    mockScroll(-100, 800, 1600); // currentPosition이 0보다 작음
    const { result } = renderHook(() => useWindowScroll(), { wrapper });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isScrollDown).toBe(false);
  });

  it('currentPosition이 0보다 클 경우 isScrollDown을 업데이트 하지 않음', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MemoryRouter>{children}</MemoryRouter>;

    mockScroll(800, 800, 1600); // isScrollDownMax 상태
    const { result } = renderHook(() => useWindowScroll(), { wrapper });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isScrollDown).toBe(false);
  });
});
