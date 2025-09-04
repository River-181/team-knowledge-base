// 🚀 Team. 망상궤도 지식창고 웹사이트 - 메인 스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 URL을 기반으로 네비게이션 활성화
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            link.getAttribute('href').includes(currentPath.split('/').pop())) {
            link.classList.add('active');
        }
    });

    // 모바일 메뉴 토글 기능
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    function openSidebar() {
        sidebar.classList.add('open');
        menuToggle.classList.add('active');
        mobileOverlay.classList.add('active');
        content.classList.add('sidebar-open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        sidebar.classList.remove('open');
        menuToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        content.classList.remove('sidebar-open');
        document.body.style.overflow = '';
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }
    
    // 오버레이 클릭시 사이드바 닫기
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeSidebar);
    }
    
    // 사이드바 외부 클릭시 닫기
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeSidebar();
        }
    });
    
    // 터치 스와이프 기능 (모바일)
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const minSwipeDistance = 50;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0 && touchStartX < 50) {
                // 오른쪽 스와이프 (사이드바 열기)
                openSidebar();
            } else if (swipeDistance < 0 && sidebar.classList.contains('open')) {
                // 왼쪽 스와이프 (사이드바 닫기)
                closeSidebar();
            }
        }
    }
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    // ESC 키로 사이드바 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
    
    // 화면 크기 변경시 사이드바 상태 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });

    // Mermaid 다이어그램 초기화
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            themeVariables: {
                primaryColor: '#007AFF',
                primaryTextColor: '#333',
                primaryBorderColor: '#007AFF',
                lineColor: '#333',
                secondaryColor: '#f8f9fa',
                tertiaryColor: '#e9ecef'
            }
        });
    }

    // 부드러운 스크롤 효과
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 메타인지 섹션 인터랙션
    const metaQuestions = document.querySelectorAll('.meta-question');
    metaQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            setTimeout(() => {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }, 200);
        });
    });

    // 페이지 로드 애니메이션
    const contentElement = document.querySelector('.content');
    if (contentElement) {
        contentElement.style.opacity = '0';
        contentElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            contentElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            contentElement.style.opacity = '1';
            contentElement.style.transform = 'translateY(0)';
        }, 100);
    }
});

// 유틸리티 함수들
function highlightText(text) {
    return `<span class="highlight">${text}</span>`;
}

function addBadge(text, type = 'primary') {
    return `<span class="badge badge-${type}">${text}</span>`;
}

// 검색 기능 (향후 확장 가능)
function searchContent(query) {
    // 간단한 텍스트 검색 구현
    const content = document.querySelector('.content');
    const text = content.textContent.toLowerCase();
    return text.includes(query.toLowerCase());
}
