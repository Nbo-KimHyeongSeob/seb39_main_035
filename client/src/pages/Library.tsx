import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HorizontalContainer from '../components/HorizontalContainer';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import useScrollTop from '../util/useScrollTop';
import { BsPlusSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const navigate = useNavigate();
  useScrollTop();

  return (
    <Layout>
      <PageTitle title='서재' />
      <BookAddButton onClick={() => navigate('/books/search')}>
        <BsPlusSquare />
        <div className='noResults'>읽고 싶은 책을 추가해보세요 🤗</div>
      </BookAddButton>
      <HorizontalContainer title='읽고 있는 책' bookStatus='ING' />
      <HorizontalContainer title='읽고 싶은 책' bookStatus='YET' />
      <HorizontalContainer title='다 읽은 책' bookStatus='DONE' />
    </Layout>
  );
};

export default Library;

const BookAddButton = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid rgba(0 0 0 / 20%);
  transition: transfrom 300ms ease-in;
  svg {
    margin-right: 30px;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 4px 0px rgba(0 0 0 / 20%);
    transform: translate(-0.1rem);
  }
`;
