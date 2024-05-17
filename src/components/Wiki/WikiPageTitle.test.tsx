import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WikiPageTitle from './WikiPageTitle';

describe('<WikiPageTitle />', () => {
  it('제목이 출력된다', () => {
    render(<WikiPageTitle>test</WikiPageTitle>);

    const title = screen.getByText('test');
    expect(title).toBeInTheDocument();
  });
});
