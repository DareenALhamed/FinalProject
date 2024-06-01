

const SmallLoading = ({ color = "white", size = 30 }) => {
  return (
    <div
      className="small-loading"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRightColor: `${color}`,
      }}
    />
  );
};

export default SmallLoading;
