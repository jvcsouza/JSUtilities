async function init() {  
    async function changeGitCommand () {
        const inputs = Array.from(document.querySelectorAll('input') || []);

        if(inputs.length <= 0){
            setTimeout(changeGitCommand, 1000);
            return;
        }

        const input = inputs.find(x => x.value.includes('git checkout'));

        if(!input){
            setTimeout(changeGitCommand, 1000);
            return;
        }

        const gitText = 'git fetch && ' + input.value;

        const container = $(input.parentElement);

        const newInput = $('<input>');
        newInput.val(gitText);
        Array.from(input.classList).map(classx => newInput.addClass(classx));

        $(input).remove();
        container.append(newInput);

        const selectCopy = () => {
            $(newInput).select();
            document.execCommand('copy');
        };

        newInput.on('click', selectCopy);

        const button = document.querySelector('button[aria-label="Copy"]');
        const newButton = $('<button>');
        newButton.html(button.innerHTML);
        Array.from(button.classList).map(classx => newButton.addClass(classx));

        newButton.on('click', selectCopy);

        $(button).remove();
        container.append(newButton);
    };

    changeGitCommand();
};

init();