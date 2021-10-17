import React, { useState, useEffect } from 'react';

import { Input } from '../../../../components/Input/styled';
import { Text } from '../../../../components/Text/styled';
import { Button } from '../../../../components/Button/styled';

import { POST, PUT, DELETE } from '../../../../services'

import { 
  Backdrop,  
  Modal,
  ContainerModal,
  ModalContainer,
  InputWrapper,
  ModalHeader,
  ModalFooter,
  Error,
  ButtonEdit,
  ButtonDelete,
} from './styled';

const ModalCrud = ({
  type,
  handleClose,
  dataTransaction,
  handleType
}) => {
  const [empresaDetail, setEmpresaDetail] = useState({
    name: dataTransaction?.name,
    documentNumber: dataTransaction?.documentNumber,
    income: dataTransaction?.income,
    outflow: dataTransaction?.outflow,
    description: dataTransaction?.description
  });

  const [errorSubmit, setErrorSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fieldName, setFieldName] = useState('');
  const [fieldDocumentNumber, setFieldDocumentNumber] = useState('');
  const [fieldIncome, setFieldIncome] = useState('');
  const [fieldOutflow, setFieldOutflow] = useState('');
  const [fieldDescription, setFieldDescription] = useState('');

  useEffect(() => {
      setFieldName(empresaDetail.name);
      setFieldDocumentNumber(empresaDetail.documentNumber);
      setFieldIncome(empresaDetail.income);
      setFieldOutflow(empresaDetail.outflow);
      setFieldDescription(empresaDetail.description);
  }, [type])

  const handleChange = (e) => {
    try {
      const { value, name } = e?.target || {}

      switch (name) {
        case 'name':
          setFieldName(value);
          break;
        case 'documentNumber':
          setFieldDocumentNumber(value);
          break;
        case 'income':
          setFieldIncome(value);
          break;
        case 'outflow':
          setFieldOutflow(value);
          break;
        case 'description':
          setFieldDescription(value);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Backdrop />
      <ContainerModal>
        <Modal>
          <ModalContainer>
            <InputWrapper>
              <Input disabled={(type === 'read')} placeholder="Nome" name="name" value={fieldName} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldName && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <InputWrapper>
              <Text disabled={(type === 'read')} placeholder="Descrição" name="description" value={fieldDescription} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldDescription && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <ModalFooter>
              <Button onClick={handleClose}>{type !== 'view' ? 'Cancelar' : 'Fechar'}</Button>
            </ModalFooter>
          </ModalContainer>
        </Modal>
      </ContainerModal>
    </>
  )
}

export default ModalCrud;