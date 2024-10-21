import { useRouter } from 'next/router';
import MovieReviewList from '@/components/MovieReviewList';
import styles from '@/styles/Movie.module.css';
import { useEffect, useState } from 'react';
import instance from '@/lib/axios';
import Image from 'next/image';
import Head from 'next/head';
import { notoSansKR } from '../_app';

const labels = {
  rating: {
    12: '12세이상관람가',
    15: '15세이상관람가',
    19: '청소년관람불가',
    all: '전체관람가',
  },
};

export default function Movie() {
  const router = useRouter();
  const id = router.query['id'];
  const [movie, setMovie] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);

  const getMovie = async (movieId) => {
    const res = await instance.get(`/movies/${movieId}`);
    setMovie(res.data);
  };

  const getMovieReviews = async (movieId) => {
    const res = await instance.get(`/movie_reviews/?movie_id=${movieId}`);
    console.log(res.data);
    setMovieReviews(res.data.results ?? []);
  }

  useEffect(() => {
    if (!id) return;
    getMovie(id);
    getMovieReviews(id);
  }, [id]);

  if (!movie) return null;

  return (
    <>
      <Head>
        <title>{movie.title} - Watchit</title>
      </Head>
      <div className={styles.header}>
        <div className={styles.poster}>
          <Image
            fill
            src={movie.posterUrl}
            alt={movie.name}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.englishTitle}>{movie.englishTitle}</div>
          <h1 className={styles.title}>{movie.title}</h1>
          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <th>개봉</th><td>{movie.date}</td>
              </tr>
              <tr>
                <th>장르</th><td>{movie.genre}</td>
              </tr>
              <tr>
                <th>국가</th><td>{movie.country}</td>
              </tr>
              <tr>
                <th>등급</th><td>{labels.rating[movie.rating]}</td>
              </tr>
              <tr>
                <th>러닝타임</th><td>{movie.runningTime}분</td>
              </tr>
              <tr>
                <th>평점</th>{' '}
                <td className={styles.starRating}>★{movie.starRating}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>소개</h2>
        <p className={`${styles.description} ${notoSansKR.className}`}>{movie.description}</p>
        <span className={styles.readMore}>더보기</span>
      </section>
      <div className={styles.reviewSections}>
        <section>
          <h2 className={styles.sectionTitle}>내 리뷰 작성하기</h2>
        </section>
        <section>
          <h2 className={styles.sectionTitle}>리뷰</h2>
          <MovieReviewList movieReviews={movieReviews} />
        </section>
      </div>
    </>
  );
}
