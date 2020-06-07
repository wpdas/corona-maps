import React, { createContext, useReducer } from 'react';

import modalReducer, { initialState } from './modalReducer';
import { showConfirmationModal, hideModal } from './modalActions';
import { ShowConfirmationModalProps } from './modalTypes';

import {
  ModalContainer,
  Content,
  Title,
  Description,
  ButtonsContainer,
} from './styles';

import Button from '../../components/Button';

export interface ModalContextProps {
  showConfirmationModal: (props: ShowConfirmationModalProps) => void;
}

const throwUndefinedError = (methodName: string) => {
  throw new Error(`${methodName} must be defined!`);
};

// Methods to be provided
export const defaultValue: ModalContextProps = {
  showConfirmationModal: () => throwUndefinedError('showConfirmationModal'),
};

const ModalContext = createContext(defaultValue);
export default ModalContext;

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
}: ModalProviderProps) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const {
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    showCancelButton,
    onClickConfirm,
    onClickCancel,
    show,
  } = state;

  const providerValue: ModalContextProps = {
    showConfirmationModal: (props) => dispatch(showConfirmationModal(props)),
  };

  const handlerOnClickConfirm = () => {
    if (onClickConfirm) {
      onClickConfirm();
    }
    dispatch(hideModal());
  };

  const handlerOnClickCancel = () => {
    if (onClickCancel) {
      onClickCancel();
    }
    dispatch(hideModal());
  };

  return (
    <ModalContext.Provider value={providerValue}>
      {show ? (
        <ModalContainer>
          <Content>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <ButtonsContainer>
              <Button type="button" onClick={handlerOnClickConfirm}>
                {confirmButtonText}
              </Button>
              {showCancelButton ? (
                <Button type="button" onClick={handlerOnClickCancel}>
                  {cancelButtonText}
                </Button>
              ) : null}
            </ButtonsContainer>
          </Content>
        </ModalContainer>
      ) : null}
      {children}
    </ModalContext.Provider>
  );
};
