export const Button = ({ children, click, type }) => {
  return (
    <button type={type} onClick={click}>
      {children}
    </button>
  );
};
