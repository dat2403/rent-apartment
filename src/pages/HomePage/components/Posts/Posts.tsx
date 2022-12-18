import React from 'react';
import { ApartModel } from '../../../../model/ApartModel';
import { numberWithCommas } from '../../../../utils/utils';
import StarIcon from '@mui/icons-material/Star';
import './posts.css';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ApartListItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  listApart: ApartModel[];
}

const Posts: React.FC<ApartListItemProps> = ({ listApart }) => {
  const navigate = useNavigate();

  return (
    <>
      <section className="posts">
        <div className="container">
          <div className="content grid3 mtop">
            {listApart?.map((val, index) => {
              const { id, image, title, address, price, total_rating } = val;
              return (
                <div
                  className="box shadow rounded"
                  key={index}
                  onClick={() => {
                    navigate(`/apart-detail/${id}`);
                  }}
                >
                  <div className="img">
                    <img src={image[0]} alt="" />
                  </div>
                  <div className="text">
                    <h4>{title}</h4>
                    <p>
                      <i className="fa fa-location-dot"></i> {address}
                    </p>
                  </div>
                  <div className="price flex">
                    <h4 style={{ color: 'red' }}>
                      {numberWithCommas(Number(price))}
                    </h4>
                    <div className="flex">
                      <Typography variant="h5">
                        {Math.round(total_rating)} / 5
                      </Typography>
                      <StarIcon
                        style={{
                          fontSize: '25px',
                          color: 'orange',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Posts;
