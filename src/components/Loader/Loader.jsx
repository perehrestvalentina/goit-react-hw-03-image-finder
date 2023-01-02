import { Audio } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Audio
      className=""
      height="60"
      width="60"
      radius="10"
      color="blue"
      ariaLabel="loading"
    />
  );
};
export default Loader;
