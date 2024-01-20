import React from 'react';
import 'tachyons';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center" style={{ position: 'relative', maxWidth: '800px', margin: 'auto' }}>
      <img alt="" src={imageUrl} style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }}
      />
      {boxes.map((box, index) => (
        <div
          key={index}
          className="bounding-box"
          style={{
            position: 'absolute',
            top: `${box.top_row * 100}%`,
            left: `${box.left_col * 100}%`,
            bottom: `${(1 - box.bottom_row) * 100}%`,
            right: `${(1 - box.right_col) * 100}%`,
            border: '2px solid #00ff00', // Adjust border style as needed
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)', // Add a subtle shadow for better visibility
          }}
        ></div>
      ))}
    </div>
  );
};

export default FaceRecognition;
