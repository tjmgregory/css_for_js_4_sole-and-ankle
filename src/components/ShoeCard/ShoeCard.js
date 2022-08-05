import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const Flag = ({variant}) => {
  const text = variant === 'on-sale' ? 'Sale' : 'Just Released!'
  const labelColor = variant === 'on-sale' ? COLORS.primary : COLORS.secondary

  return <_Flag style={{'--label-color': labelColor}}>{text}</_Flag>
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper >
        <FlagWrapper>
          {variant !== 'default' && <Flag variant={variant}/>}
        </FlagWrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price aria-disabled={!!salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
`;

const FlagWrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 16px 16px 0 0;
  height: 2rem;
  position: relative;
`

const _Flag = styled.div`
  background-color: var(--label-color);
  border-radius: 2px;
  font-size: ${14/16}rem;
  font-weight: 700;
  color: ${COLORS.white};
  padding: 7px 9px;
  width: fit-content;
  position: absolute;
  right: -4px;
  top: 10px;
  z-index: 1;
`

const ImageWrapper = styled.div`
  position: relative;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  &[aria-disabled=true] {
    color: ${COLORS.gray[700]};
    text-decoration: line-through;
  }
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
