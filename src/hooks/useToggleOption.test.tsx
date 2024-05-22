import { act, render, renderHook, screen, fireEvent } from '@testing-library/react';
import useToggleOption from './useToggleOption';

function ToggleOptionComponent() {
  const { isOpen, toggle, optionRef } = useToggleOption();

  return (
    <div>
      <button type="button" onClick={toggle}>
        Toggle Option
      </button>
      {isOpen && <div ref={optionRef}>Option Content</div>}
    </div>
  );
}

describe('useToggleOption', () => {
  it('toggle 함수 실행 시 isOpen이 변경됨', () => {
    const { result } = renderHook(() => useToggleOption());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('ref 바깥을 클릭하면 isOpen이 false가 됨', async () => {
    render(<ToggleOptionComponent />);

    fireEvent.click(screen.getByText('Toggle Option'));

    expect(screen.getByText('Option Content')).toBeInTheDocument();

    await act(async () => {
      fireEvent.mouseDown(document.body);
    });

    expect(screen.queryByText('Option Content')).not.toBeInTheDocument();
  });
});
