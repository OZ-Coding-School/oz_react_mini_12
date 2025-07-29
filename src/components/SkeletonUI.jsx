import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    background-color: #555;
  }
  50% {
    background-color: #666;
  }
  100% {
    background-color: #555;
  }
`;

const SkeletonBox = styled.div`
  background-color: #555;
  border-radius: 0.5rem;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const SkeletonSlide = styled.div`
  width: 110rem;
  height: 37.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  margin-top: 9rem;
  border-radius: 0.5rem;
`;

const SkeletonCard = styled.div`
  width: 20rem;
  height: 35rem;
  background-color: #444;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${pulse} 1.5s infinite ease-in-out;

  .skeleton-img {
    width: 18rem;
    height: 27rem;
    background-color: #555;
    border-radius: 0.5rem;
  }

  .skeleton-title {
    width: 70%;
    height: 2rem;
    background-color: #555;
    border-radius: 0.3rem;
  }

  .skeleton-vote {
    width: 40%;
    height: 1.2rem;
    background-color: #555;
    border-radius: 0.3rem;
  }
`;

const SkeletonTitle = styled(SkeletonBox)`
  width: 17rem;
  height: 3.3rem;
  position: absolute;
  top: 2rem;
  left: 2rem;
`;
const SkeletonSearch = styled(SkeletonBox)`
  width: 28rem;
  height: 3rem;
  position: absolute;
  top: 2rem;
  left: 32rem;
`;

const SkeletonGrid = styled.div`
  display: grid;
  width: 110rem;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  margin: 0;
  gap: 1rem;
  padding: 4rem;
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
`;

const Skeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonTitle />
      <SkeletonSearch />
      <SkeletonSlide>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
      </SkeletonSlide>
      <SkeletonGrid>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index}>
            <div className="skeleton-img" />
            <div className="skeleton-title" />
            <div className="skeleton-vote" />
          </SkeletonCard>
        ))}
      </SkeletonGrid>
    </SkeletonContainer>
  );
};

export default Skeleton;
