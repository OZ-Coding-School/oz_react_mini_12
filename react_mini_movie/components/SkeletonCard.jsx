// 데이터를 불러오는 동안 화면에 보여줄 "빈 틀"의 역할을 하는 카드

export default function SkeletonCard() {
    return(
        <div className="skeleton-card">
            {/* 이미지 영역의 자리 표시 */}
            <div className="skeleton-img" />
            {/* 영화 제목 위치에 들어갈 가짜 텍스트 블럭 */}
            <div className="skeleton-text title" />    
            {/* 평점 위치에 들어갈 가짜 텍스트 블럭 */}
            <div className="skeleton-text rating" />
        </div>
    );
}

/* 필요이유
    실제 시간으로는 약간의 시간이 더 걸릴수 있지만 사용자는 자리를 미리 보여줘도
    금방 나올 것 같은 심리적 안정감을 준다.
    그래서 구성을 미리 예측 할수 있어서 처음 사용해도 비교적 혼란이 덜 하다.
*/