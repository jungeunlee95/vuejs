new Vue({
    el: '#app',
    data: {
        myChoice : null,  // 나의 선택
        comChoice : null, // 컴퓨터의 선택
        count : 3, // 게임 시간
        isSelectable : true, // 게임 start를 눌렀을 때, 버튼을 가리기 위한 조건 값
        winner : null, // 최종 승리자
        lifeOfMe : 3,   // 나의 목숨
        lifeOfCom : 3,  // 컴퓨터의 목숨
        logs : [],
        selects : [
            {name:'가위', value:'scissor'},
            {name:'바위', value:'rock'},
            {name:'보', value:'paper'}
        ]
    },
    computed: {
        myChoiceImg: function () {
            return this.myChoice !== null ? `Images/${this.myChoice}.jpg` : 'Images/question.jpg'
        },
        comChoiceImg: function () {
            if(this.comChoice === 'selecting'){
                return `Images/samsam.gif`;
            }
            return this.comChoice !== null ? `Images/${this.comChoice}.jpg` : 'Images/question.jpg'
        },
        leftLifeOfMe: function(){
            return 3 - this.lifeOfMe
        },
        leftLifeOfCom: function(){
            return 3 - this.lifeOfCom
        }

    },
    watch: {
        count : function(newVal){
            if(newVal === 0){
                // 컴퓨터가 가위바위보 선택
                this.selectCom();

                // 가위바위보 누가 이겼어?
                this.whosWin()

                // 게임 리셋
                this.count = 3
                this.isSelectable = true

                // 로그 업데이트
                this.updateLogs()
            }
        },
        lifeOfMe : function(newVal){
            if(newVal === 0){
                // 내 목숨이 0개면 게임 종료
                this.endGame('아쉽지만, 당신이 패배했습니다.')
            }
        },
        lifeOfCom : function(newVal){
            if(newVal === 0){
                // 컴퓨터 목숨이 0개면 게임 종료
                this.endGame('오 웬일~? 당신이 승리했습니다.')
            }
        },


    },
    methods: {
        startGame : function(){
            // 가위바위보 선택 후 선택완료 버튼 클릭 시, 버튼 안보이게
            this.isSelectable = false;
            if(this.myChoice === null){
                alert('가위 바위 보 중 하나를 선택해주세요!');
                this.isSelectable = true;
            } else{
                // 빈 값이 아니면, 카운트 다운 시작!
                this.comChoice = 'selecting'

                let countDown = setInterval(()=>{
                    // 카운트 다운
                    this.count --
                    // 0이 되면  stop
                    if(this.count === 0){
                    clearInterval(countDown)
                }
            }, 700)
            }
        },
        selectCom : function() {
            let number = Math.random();
            if(number < 0.33){
                this.comChoice = 'scissor';
            } else if (number < 0.66){
                this.comChoice = 'rock';
            } else{
                this.comChoice = 'paper';
            }
        },
        whosWin : function(){
            if(this.myChoice === this.comChoice) this.winner = 'samsam'
            else if(this.myChoice === 'rock' &&  this.comChoice === 'scissor') this.winner = 'me'
            else if(this.myChoice === 'scissor' &&  this.comChoice === 'paper') this.winner = 'me'
            else if(this.myChoice === 'paper' &&  this.comChoice === 'rock') this.winner = 'me'
            else if(this.myChoice === 'scissor' &&  this.comChoice === 'rock') this.winner = 'com'
            else if(this.myChoice === 'paper' &&  this.comChoice === 'scissor') this.winner = 'com'
            else if(this.myChoice === 'rock' &&  this.comChoice === 'paper') this.winner = 'com'
            else this.winner = 'error'

            if(this.winner === 'me'){
                this.lifeOfCom --
            } else if(this.winner === 'com'){
                this.lifeOfMe --
            }
        },
        updateLogs : function(){
            let log = {
                message : `당신: ${this.myChoice}, 컴퓨터 : ${this.comChoice}`,
                winner : this.winner
            }
            this.logs.unshift(log)
        },
        endGame: function (msg) {
            setTimeout( () => {
                confirm(msg);
            this.lifeOfMe = 3
            this.lifeOfCom = 3
            this.myChoice = null
            this.comChoice = null
            this.wunner = null
            this.logs = []
        }, 500)
        }
    }
})
