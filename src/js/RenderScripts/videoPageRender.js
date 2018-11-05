class RenderVideoPage {
    init(mainElem) {
        mainElem.querySelector("h1").innerHTML = "Видеонаблюдение";
        const content = mainElem.querySelector(".content");
        content.innerHTML = "";
        this.render(content);
    }

    render(content) {
        let t = document.querySelector('#videostemplate').content.cloneNode(true);
        content.appendChild(t);
    }
}

const VideoPage = new RenderVideoPage();
export {VideoPage};