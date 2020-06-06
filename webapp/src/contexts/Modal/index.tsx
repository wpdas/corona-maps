import React, { createContext, useReducer, useEffect } from 'react';

import modalReducer, { initialState } from './modalReducer';
import {
  showConfirmationModal,
  ShowConfirmationModalProps,
} from './modalActions';

import { ModalContainer } from './styles';

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
  // TODO: implement modal using state props
  useEffect(() => {
    console.log(state);
  }, []);

  const providerValue: ModalContextProps = {
    showConfirmationModal: (props) => dispatch(showConfirmationModal(props)),
  };

  return (
    <ModalContext.Provider value={providerValue}>
      <ModalContainer></ModalContainer>
      {children}
    </ModalContext.Provider>
  );
};
