import React, { useEffect, useState } from 'react';

const PostList = ({ clickedDate }) => {
  const [posts, setPosts] = useState([]);

  // 예시: 날짜가 선택되면 해당 날짜의 포스트 목록을 가져오는 함수
  const fetchPosts = async () => {
    try {
      // 여기에서 날짜를 기반으로 포스트를 가져오는 API 호출 또는 데이터 처리를 수행합니다.
      // 예시: fetch 함수를 사용한 API 호출
      const response = await fetch(`/api/posts?date=${clickedDate.format('YYYY-MM-DD')}`);
      const data = await response.json();
      
      // 가져온 포스트 목록을 상태에 설정
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // selectedDate가 변경될 때마다 포스트 목록을 다시 가져오도록 useEffect 설정
  useEffect(() => {
    if (clickedDate) {
      fetchPosts();
    }
  }, [clickedDate]);

  return (
    <div>
      <h3>Post List for {clickedDate ? clickedDate.format('YYYY-MM-DD') : 'No date selected'}</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
