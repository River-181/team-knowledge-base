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

    // 모바일 메뉴 토글 (필요시 사용)
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

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
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
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
