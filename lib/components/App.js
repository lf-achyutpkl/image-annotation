import React from 'react';
import ImageAnnotationEdit from './ImageAnnotationEdit';

export default props => {
  return (
    <div>
      <ImageAnnotationEdit
        imageURL="http://www.ultrahdfreewallpapers.com/uploads/large/animals/cat-hd-wallpaper-0380.jpg"
        height={600}
        width={800}
      />
    </div>
  );
};
