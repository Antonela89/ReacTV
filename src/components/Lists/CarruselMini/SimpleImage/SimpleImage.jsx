import "./SimpleImage.css";

const SimpleImage = ({ title, path, onClick }) => {
  return (
    <>
      <img
        src={path}
        alt={title}
        onClick={() => {
          onClick();
        }}
      />
    </>
  );
};

export default SimpleImage;
