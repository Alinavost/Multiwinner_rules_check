let results = []
let isTrue = false;
$(function(){
    var loading = $('#loadbar').hide();
    $(document)
    .ajaxStart(function () {
        loading.show();
    }).ajaxStop(function () {
    	loading.hide();
    });


    $ans = 3;

    $.fn.checking = function(ck) {
        if (ck != $ans)
            return 'INCORRECT';
        else
            return 'CORRECT';
    };


});
        var getNextQuestion = function(choice){
        if(isTrue){
            if(questions.length > 0){
            debugger;
            console.log(questions.length);
            question =  questions.pop();
            answers = questions.pop();
    	    results.push(choice);
    	    $('#loadbar').show();
    	    $('#quiz').fadeOut();
    	    document.getElementById('main_question').innerHTML = "Consider 4 votings which consists of the following order: " + JSON.stringify(question);
            $('#first_option').replaceWith('<label onclick="getNextQuestion(0);" id="first_option" class="element-animation1 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="0">'+JSON.stringify(answers[0])+'</label>');
            $('#second_option').replaceWith('<label onclick="getNextQuestion(1);" id="second_option" class="element-animation2 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="1">'+JSON.stringify(answers[1])+'</label>');
            $('#third_option').replaceWith('<label onclick="getNextQuestion(2);" id="third_option" class="element-animation3 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="2">'+JSON.stringify(answers[2])+'</label>');
            $('#forth_option').replaceWith('<label onclick="getNextQuestion(3);" id="forth_option" class="element-animation4 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value="3">'+JSON.stringify(answers[3])+'</label>');

    	    setTimeout(function(){
                $('#quiz').show();
                $('#loadbar').fadeOut();
    	        }, 1500);

            }
            else{
                if(pictures.length > 0){
                console.log(pictures);
                answers = pictures.pop();
    	        results.push(choice);
    	        $('#loadbar').show();
    	        $('#quiz').fadeOut();
    	        document.getElementById('main_question').innerHTML = "Please choose a pic";
                $('#first_option').replaceWith('<label onclick="getNextQuestion(0);" id="first_option" class="element-animation1 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="image" src="static/images/' + answers[0] + '.PNG" name="q_answer" value="0"></label>');
                $('#second_option').replaceWith('<label onclick="getNextQuestion(1);" id="second_option" class="element-animation2 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="image" src="static/images/' + answers[1] + '.PNG" name="q_answer" value="1"></label>');
                $('#third_option').replaceWith('<label onclick="getNextQuestion(2);" id="third_option" class="element-animation3 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="image" src="static/images/' + answers[2] + '.PNG" name="q_answer" value="2"></label>');
                $('#forth_option').replaceWith('<label onclick="getNextQuestion(3);" id="forth_option" class="element-animation4 btn btn-lg btn-primary btn-block"><span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="image" src="static/images/' + answers[3] + '.PNG" name="q_answer" value="3"></label>');

    	        setTimeout(function(){
                    $('#quiz').show();
                    $('#loadbar').fadeOut();
    	            }, 1500);

                    }
                    else{
                        alert("No more questions :)")
                    }
                }
            }
                isTrue =!isTrue;
        }
