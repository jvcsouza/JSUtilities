async function init() {
    async function createHeaderCollapse() {
        const header = $('#ak-main-content div:first div:first div:first');
        const content = $('[data-testid="platform-board-kit.ui.board.scroll.board-scroll"]');
        const headerAll = $('#ak-jira-navigation');
        const resizeButton = $('[data-testid="ContextualNavigation-resize-button"]').clone();

        if (!header.length || !content.length) {
            setTimeout(createHeaderCollapse, 2000);
            return;
        }

        // resizeButton.css({ transform: 'rotate(90deg)', left: '333px', top: '38px', opacity: 'initial' });
        resizeButton.removeAttr('class');
        resizeButton.addClass('btn-toggle-down');
        resizeButton.off('click').on('click', () => {
            header.toggleClass('hidden-jsu');
            content.toggleClass('mt-10-jsu');
            resizeButton.css({ transform: header.hasClass('hidden-jsu') ? 'rotate(90deg)' : 'rotate(270deg)' });
            resizeButton.css({ top: header.hasClass('hidden-jsu') ? '38px' : '48px' });
            resizeButton.blur();
        });

        headerAll.append(resizeButton);
        header.addClass('animation-jsu');
        header.addClass('hidden-jsu');
        content.addClass('mt-10-jsu');
    };

    $(document).ready(() => createHeaderCollapse());
};

init();