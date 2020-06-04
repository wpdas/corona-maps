import React, { useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import { MdLocationOn, MdMyLocation, MdAddLocation } from 'react-icons/md';
import { ThemeContext } from 'styled-components';

import useI18n from '../../hooks/i18n';
import { ThemeContextValue } from '../../theme';
import { ButtonWrapper } from './styles';

interface CommonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const LocationButton: React.FC<CommonProps> = ({
  onClick,
}: CommonProps) => {
  const {
    current: { color2 },
  } = useContext<ThemeContextValue>(ThemeContext);
  const { text, labels } = useI18n();

  return (
    <ButtonWrapper onClick={onClick}>
      <MdLocationOn color={color2} data-tip data-for="locationButton" />
      <ReactTooltip
        id="locationButton"
        effect="solid"
        place="right"
        type="dark">
        <span>{text(labels.locationButton)}</span>
      </ReactTooltip>
    </ButtonWrapper>
  );
};

export const AddLocationButton: React.FC<CommonProps> = ({
  onClick,
}: CommonProps) => {
  const {
    current: { color2 },
  } = useContext<ThemeContextValue>(ThemeContext);
  const { text, labels } = useI18n();

  return (
    <>
      <ButtonWrapper onClick={onClick} data-tip data-for="addLocationButton">
        <MdAddLocation color={color2} />
      </ButtonWrapper>
      <ReactTooltip
        id="addLocationButton"
        effect="solid"
        place="right"
        type="dark">
        <span>{text(labels.newContaminatedPointButton)}</span>
      </ReactTooltip>
    </>
  );
};

export const MyLocationButton: React.FC<CommonProps> = ({
  onClick,
}: CommonProps) => {
  const {
    current: { color2 },
  } = useContext<ThemeContextValue>(ThemeContext);
  const { text, labels } = useI18n();

  return (
    <>
      <ButtonWrapper onClick={onClick} data-tip data-for="myLocationButton">
        <MdMyLocation color={color2} />
      </ButtonWrapper>
      <ReactTooltip
        id="myLocationButton"
        effect="solid"
        place="right"
        type="dark">
        <span>{text(labels.myLocationButton)}</span>
      </ReactTooltip>
    </>
  );
};
