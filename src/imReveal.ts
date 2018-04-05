class imReveal{
    dragging: boolean
    containerLeft: number
    width: number
    offset: number
    container: HTMLElement
    fffWrapper: HTMLElement
    slider: HTMLElement
    right: HTMLElement
    left: HTMLElement
    sliderHandle: HTMLElement



    constructor(container: HTMLElement){
        this.dragging = false;
        this.container = container;

        this.fffWrapper = document.createElement("div");
        this.wrap(this.container, this.fffWrapper);
        this.container.style.overflow = "visible";
        this.fffWrapper.style.overflow = "hidden";

        this.left = container.getElementsByTagName("img")[0];
        this.right = container.getElementsByTagName("img")[1];
        this.reinit();
        this.slider = document.createElement("div");
        this.wrap(this.right, this.slider);

        this.sliderHandle = document.createElement("div");
        this.container.appendChild(this.sliderHandle);
        this.registerEventListeners();
        this.addClasses();
    }


    private registerEventListeners(){
        /* Desktop experience */
        this.sliderHandle.addEventListener("mousedown", this.start.bind(this));
        this.container.addEventListener("mousemove", this.move.bind(this));
        this.container.addEventListener("mouseup", this.stop.bind(this));
        this.container.addEventListener("mouseenter", ()=>{});
        this.container.addEventListener("mouseleave", this.stop.bind(this));

        /* Touch experience*/
        this.sliderHandle.addEventListener("touchstart", this.start.bind(this), {passive: true});
        this.container.addEventListener("touchmove", this.move.bind(this), {passive: true});
        this.container.addEventListener("touchend", this.stop.bind(this));
        this.container.addEventListener("touchcancel", this.stop.bind(this));


        //prevent dragging
        this.container.addEventListener("dragstart", e => e.preventDefault());
        this.right.addEventListener("dragstart", e => e.preventDefault());
        this.left.addEventListener("dragstart", e => e.preventDefault());

        window.addEventListener("resize", this.reinit.bind(this));

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
        this.offset = Math.min(Math.max(this.getXOffset(e), 0), this.width);
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

    private getXOffset(e: any): number{
        if(typeof TouchEvent != "undefined" && e instanceof TouchEvent){
            return e.touches[0].clientX - this.containerLeft;
        }else{
            return (<MouseEvent>e).clientX - this.containerLeft;
        }
    }

    private wrap(element: HTMLElement, wrapper: HTMLElement){
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
    }

    reinit(){
        this.width = this.container.clientWidth;
        this.containerLeft = this.container.getBoundingClientRect().left;
    }
}
