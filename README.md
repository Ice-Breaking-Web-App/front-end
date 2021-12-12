# Introduction

* 코로나19로 인한 비대면 모임 상황에서도 효율적인 아이스 브레이킹을 수행할 수 있는 서비스 구현 프로젝트
* 개발기간 : 2021.09.30 ~ 2021.12.12(약 9주)
* 개발인원 : 3 Front-end, 2 Back-end
* [Front-end Github](https://github.com/Ice-Breaking-Web-App/front-end)
* [Back-end Github](https://github.com/Ice-Breaking-Web-App/spring-boot-server)

# Technologies

* HTML
* CSS
* JavaScript
* spring boot
* Python
* VS Code
* Jupyter Notebook
* Github

# Front-End Features
### all
   팀장, 팀원 공통 뷰(정나윤)
   - home(홈 화면), home_guide(홈 화면 가이드)
   - user가 참여하고 있는 팀 목록 제공 
     - leaderteam(내가 팀장인 팀)
     - memberteam(내가 팀원인 팀)
     - recentteam(최근 참여한 팀)
   - 게임
     - game_board, game_list, game_choose(게임 페이지)
     - game_resultboard(게임 정답 공개)
     - game_score(게임 점수 공개)
   - 기타 경고 및 안내
     - answer_complete(답변 작성 완료)
     - answer_wait(답변 작성 미완료)
     - answer_warning(전원 답변 작성 미완료)
     - game_warning(전원 답변 작성 미완료)
   
### leader
   팀장 뷰(이재헌)
   - 팀 생성
     - create_team(팀 생성)
     - create_invitecode(팀별 코드 제공)
     - create_question(질문 생성)
     - create_member(팀원 추가)
   - manage_write(답변 작성)
   - manage_team(팀 관리)
   - 업그레이드 버전
     - create_upgrade(업그레이드 안내)
     - upgrade(업그레이드 결제)
   - 기타 경고 및 안내
     - create_maxquestion(질문 추가 불가)
     - create_maxmember(팀원 추가 불가)
   
### member
   팀원 뷰(이재헌)
   - 코드 입력
      - invitecode(팀별 코드 입력)
      - invitecode_warning(코드 오류)
   - 답변 작성
      - answer(답변 작성)
      - answer_start(답변 작성 안내)
      - answer_memberlist(팀원 이름 선택)

# Back-End Features

* [Back-end Github](https://github.com/Ice-Breaking-Web-App/spring-boot-server)
