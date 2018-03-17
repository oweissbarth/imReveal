class imReveal{
    dragging: boolean    
    containerLeft: number
    offset: number
    container: HTMLElement
    slider: HTMLElement
    right: HTMLElement
    left: HTMLElement
    sliderHandle: HTMLElement


    constructor(container: HTMLElement){
        this.dragging = false;
        this.container = container;

        this.left = container.getElementsByTagName("img")[0];
        this.right = container.getElementsByTagName("img")[1];
        this.containerLeft = container.getBoundingClientRect().left;
        this.slider = document.createElement("div");
        this.wrap(this.right, this.slider);

        this.sliderHandle = document.createElement("div");
        this.container.appendChild(this.sliderHandle);
        this.registerEventListeners();
        this.addClasses();
    }


    private registerEventListeners(){
        this.sliderHandle.addEventListener("mousedown", this.start.bind(this))
        this.container.addEventListener("mousemove", this.move.bind(this))
        this.container.addEventListener("mouseup", this.stop.bind(this))
        this.container.addEventListener("mouseleave", this.stop.bind(this))
        
        //prevent dragging
        this.container.addEventListener("dragstart", e => e.preventDefault());
        this.right.addEventListener("dragstart", e => e.preventDefault());
        this.left.addEventListener("dragstart", e => e.preventDefault());

    }

    private addClasses(){
        this.container.classList.add("imReveal-container");
        this.slider.classList.add("imReveal-slider");
        this.sliderHandle.classList.add("imReveal-slider-handle");
    }
    
    private move(e: MouseEvent){
        if(! this.dragging){
            return;
        }
        this.offset = this.getXOffset(e);
        window.requestAnimationFrame(this.update.bind(this));
    }
    
    private update(){
        this.slider.style.left = this.offset + "px"
        this.right.style.left = -this.offset + "px";
        this.sliderHandle.style.left = (this.offset-25 ) + "px";
        if( this.dragging)
            window.requestAnimationFrame(this.update.bind(this));
    }
    
    private start(){
        this.dragging = true;
    }
    
    private stop(){
        this.dragging = false;
    }
    
    private getXOffset(e: MouseEvent): number{
        return e.clientX - this.containerLeft;
    }

    private wrap(element: HTMLElement, wrapper: HTMLElement){
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
    }
}
