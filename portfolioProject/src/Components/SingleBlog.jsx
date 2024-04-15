import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { handleDeleteRequests, handleGetRequests, handlePostRequests } from '../Methods/handleApiRequests';
import styles from './SingleBlog.module.css';
import  dayjs from 'dayjs';
import { toast } from 'react-toastify';

const SingleBlog = () => {
// Using state for getting blog
 const [data, setData] = useState([]);
 const [review, setReview] = useState({
  reviewerName: '',
  content: '',
 })
 const [show, setShow] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 const { id } = useParams();
 
 useEffect(() => {
  const fetchData = async () => {
    try {
      const resp = await handleGetRequests(`blogs/allblogs/${id}`);
      if (resp.status === 200) {
        setData(resp.data.blog);
      } else if (resp.status === 404 || resp.status === 500) {
        console.log(resp.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          setIsLoggedIn(true);
          // Do nothing, the user is authorized
        }
      } catch (error) {
        toast.error("Error fetching data! Please login");
      }
    }

    fetchData();
  }, []);


  //handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const postedReview = await handlePostRequests(`blogs/addreview/${id}`, review, token);
      if (postedReview.status === 201) {
        setData(postedReview.data.updatedBlog);
        console.log(postedReview.data.updatedBlog);
        toast.success(postedReview.data.message);
      } else {
        toast.error(postedReview.message);
      }
    } catch (error) {
      console.log(error);
    }
    setReview({
      reviewerName: '',
      content: '',
    });
  }

  // function to show or hide reviews 
  const showHide = () => {
    setShow(!show);
  }

  const sortedReviews = data.reviews? data.reviews.slice().reverse() : [];
  

  // deleting reviews
  const handleReviewDelete = async (blogId) => {
    const resp = await handleDeleteRequests(`blogs/${id}/${blogId}`);

    if (resp.status === 404 || resp.status === 500) {
      toast.error(resp.data.message);
    } else if (resp.status === 200) {
      setData(resp.data.blog);
      console.log(data)
      toast.success(resp.data.message);
    } else {
      toast.error("Error deleting! Try again!");
    }
  }

  return (
    <div className={styles.blogArea}>
      <div className={styles.blog}>
        <div className={styles.blogHeader}>
          <h3>Blog Title: {data.title}</h3>
          <h4>Posted on {dayjs(data.createdAt).format('MMMM D, YYYY HH:mm')}</h4>
        </div>
        <div className={styles.blogBody}>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <h3>Add a review</h3>
          <div>
            
          </div>
          <input
            placeholder='Input your name'
            value={review.reviewerName}
            onChange={(e) => {
              setReview({...review, reviewerName: e.target.value})
            }}
            className={styles.inputBox}
            required></input>
          <textarea 
            placeholder='Enter your review ...'
            value={review.content}
            onChange={(e) => {
              setReview({...review, content: e.target.value})
            }}
            className={styles.textBox}
          ></textarea>
          <button className={styles.reviewBtn}>Post review</button>
        </form>
      </div>
      <div className={styles.reviewsSection}>
        <div className={styles.show}>
          <h3>Reviews</h3>
          <span onClick={showHide}>Show/hide reviews</span>
        </div>
        {show && <div className={styles.reviews}>
          {sortedReviews && sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
              <div key={review._id} className={styles.reviewBox}>
                <span className={styles.reviewerIcon}>{review.reviewerName[0]}</span>
                <div className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <h4>{review.reviewerName}</h4>
                    <p>{dayjs(review.date).format('MMMM D, YYYY HH:mm')}</p>
                  </div>
                  <div className={styles.reviewContent}>
                    <p>{review.content}</p>
                  </div>
                  {isLoggedIn && <button className={styles.deleteBtn} onClick={() => handleReviewDelete(review._id)}>Delete</button>}
                </div>
                
              </div>
            ))
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
        }
      </div>
    </div>
  )
}

export default SingleBlog
