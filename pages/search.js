import { useRouter } from 'next/router';
import MovieList from '@/components/MovieList';
import SearchForm from '@/components/SearchForm';
import styles from '@/styles/Search.module.css';
import Header from '@/components/Header';
import Container from '@/components/Container';
import { useEffect, useState } from 'react';
import instance from '@/lib/axios';
import Head from 'next/head';
import { notoSansKR } from './_app';


export default function Search() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const q = router.query['q'];

  const getMovies = async (query) => {
    const res = await instance.get(`/movies?q=${query}`);
    const nextMovies = res.data.results;
    setMovies(nextMovies);
  };

  useEffect(() => {
    getMovies(q);
  }, [q]);

  return (
    <>
      <Head>
        <title>{q} 검색 결과 - Watchit</title>
      </Head>
      <SearchForm initialValue={q} />
      <h2 className={`${styles.title} ${notoSansKR.className}`}>
        <span className={styles.keyword}>{q}</span> 검색 결과
      </h2>
      <MovieList movies={movies} />
    </>
  );
}
