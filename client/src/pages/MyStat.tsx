import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Boxcontainer from '../components/BoxContainer';
import BookCalendar from '../components/BookCalendar';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { getCalendarData } from '../stores/stat/statSlice';
import { AppDispatch, RootState } from '../stores/store';
import { getRandomMemo } from '../stores/memo/memoSlice';
import AbandonBooks from '../components/AbandonBooks';
import RandomMemo from '../components/RandomMemo';
import useScrollTop from '../util/useScrollTop';

const MyStat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { memo } = useSelector((state: RootState) => state.memo);
  useEffect(() => {
    dispatch(getCalendarData(1));
    dispatch(getRandomMemo());
  }, [dispatch]);
  useScrollTop();
  return (
    <Layout>
      <PageTitle title='나의 독서 통계 보기' />
      <Boxcontainer containerTitle='📝 랜덤 메모'>
        {memo && <RandomMemo />}
      </Boxcontainer>
      <Boxcontainer containerTitle='📓 잊고 지낸 나의 책'>
        <AbandonBooks />
      </Boxcontainer>
      <Boxcontainer containerTitle='🗓 독서 달력'>
        <BookCalendar />
      </Boxcontainer>
    </Layout>
  );
};

export default MyStat;
