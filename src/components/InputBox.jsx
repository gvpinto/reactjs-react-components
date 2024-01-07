import styled, { css } from 'styled-components';

const variations = {
  input: css`
    border-radius: 6px;
  `,
  select: css`
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  `,
};

const StyledInput = styled.input.attrs((props) => ({
  $variation: props.$variation || 'input',
}))`
  display: block;
  padding: 1rem;
  /* line-height: 1.8; */
  font-size: 1.6rem;
  font-family: inherit;
  color: var(--color-grey-7);

  height: 100%;
  width: 100%;
  border: none;

  ${(props) => variations[props.$variation]}

  /* box-shadow: 0 0 0 1pxvar(--color-grey-3); */
  border: 1px solid var(--color-grey-3);
  transition: all 0.3s;

  outline: none;

  &:hover,
  &:focus {
    border: 1px solid #4dabf7;
  }

  &::placeholder {
    color: var(--color-grey-4);
    opacity: 1;
  }
`;

function InputBox({ variation }) {
  return (
    <StyledInput
      type='text'
      $variation={variation}
      placeholder='Select or Search...'
    />
  );
}

export default InputBox;
