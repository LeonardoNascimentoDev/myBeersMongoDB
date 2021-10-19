import React, { useState, useEffect } from 'react';
  
import { 
  ContainerBanner,
  BannerTitle,
  ImgProduct,
  ImgBox,
  BoxProduct,
  TitleProduct
} from './styled';

import { GET } from '../../services';

const Banner = ({handleClick}) => { 

  const [productRandom, setProductRandom] = useState(); 
 
  const handleGetProducts = async () => {
    try { 
      const response = await GET(`api/v1/beers/random`); 
      const responseResolved = await response.json(); 
      if (responseResolved?.length) {   
        setProductRandom(responseResolved[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetProducts()
  }, []) 

  const handleClickProduct = () => {
    handleClick('read', productRandom)
  }
 
  return (
    <>
      {productRandom && productRandom?.image_url && (
        <ContainerBanner> 
          <BannerTitle>Produto em destaque</BannerTitle> 
          <BoxProduct onClick={() => handleClickProduct()}>
            <ImgBox style={{ 
                backgroundImage: `url(${productRandom.image_url})` 
              }}></ImgBox>
            <TitleProduct>{productRandom?.name}</TitleProduct>
          </BoxProduct>
        </ContainerBanner>
      )} 
    </>
  )
}

export default Banner