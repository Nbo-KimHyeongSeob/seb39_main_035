import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Books } from '../types/basic';
import BookCoverItem from './BookCoverItem';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

type HorizontalContainerProps = {
  bookStatus: 'YET' | 'ING' | 'DONE';
  title: string;
};

interface BookListItem extends Books {
  bookId: number;
}

const HorizontalContainer = ({
  title,
  bookStatus,
}: HorizontalContainerProps) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const handleClick = (id: number) => {
    navigate(`/books/library/${id}`);
  };
  const [bookList, setBookList] = useState<BookListItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);

  const fetchBookData = async (pageNumber: number) => {
    await axios
      .get(process.env.REACT_APP_API_BASE_URL + '/books/library', {
        headers: {
          Authorization: token,
        },
        params: {
          page: pageNumber,
          size: 4,
          bookStatus: bookStatus,
        },
      })
      .then((res) => {
        setBookList((prev) => [...prev, ...res.data.item]);
        setHasMore(pageNumber < res.data.pageInfo.totalPages);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  };

  useEffect(() => {
    fetchBookData(pageNumber);
  }, [pageNumber]);
  const loader = useRef(null);
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <Wrapper>
      <h1>{title}</h1>
      {/* <button onClick={handleAddList}>리스트 추가 요청</button> */}
      <WindowWrapper>
        <ListWrapper>
          {bookList.map((book, index) => (
            <BookCoverItem
              key={book.bookId}
              src={book.cover}
              onClick={handleClick.bind(null, book.bookId)}
            />
          ))}
          <div ref={loader} />
        </ListWrapper>
      </WindowWrapper>
    </Wrapper>
  );
};

export default HorizontalContainer;

const Wrapper = styled.div`
  margin-bottom: 20px;

  h1 {
    font-weight: 600;
    font-size: 18px;
  }
`;

const WindowWrapper = styled.div`
  overflow: hidden;
  height: 160px;
  width: 100%;
`;

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  overflow-x: auto;
  white-space: nowrap;
`;
