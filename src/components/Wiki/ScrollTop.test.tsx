import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollTop from './ScrollTop';

describe('<ScrollTop />', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('버튼을 클릭했을 때 페이지 상단으로 이동하는 함수가 실행된다.', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<ScrollTop />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });
});
