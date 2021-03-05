function timeSinceStart() {
    now = new Date();
    return now.getTime() - start.getTime();
}

complaints = [
    "Don't click me.",
    "I said don't click me.",
    "I told you, don't click me.",
    "I mean it.",
    "Stop clicking me.",
    "Stop it!",
    "I'm warning you."
];
non_complaints = [
    "You can click me now.",
    "Thanks for waiting."
];
disguisedComplaints = [
    "And now you can't.",
    "Shoot.",
    "Uhh...",
    "Thought that would work.",
    "There's nothing to see.",
    "Stop clicking.",
    "I'm leaving now."
];

Vue.createApp({
    data() {
        return {
            count1: 0,
            count2: 0,
            dontclick_found: false,
            loop_started: false,
            loop_finished: false,
            found_nothing_here: false,
            start: new Date(),
            button1_show: true,
            button1_message: "Click me!",
            button2_show: false,
            button2_message: "Don't click me.",
            button2_disguised: false
        }
    },
    methods: {
        click1(e) {
            this.count1++;
            if(this.dontclick_found) {
                if (this.loop_started){
                    if (this.loop_finished) {
                        // TODO: more
                    }
                    else {
                        this.button1_message = complaints[(this.count1 % complaints.length)];
                        if (this.count1 >= 30) {
                            this.button2_show = true;
                            this.button2_message = "Okay, this is a loop now.";
                        }
                    }
                }
                else {
                    this.button1_message = "Shoot, you found me.";
                    this.loop_started = true;
                }
            }
            else if(this.count1 >= 4*5*60 && timeSinceStart() >= 5*1000*60 && this.count2 == 0) {
                complaints = non_complaints;
                this.button2_message = complaints[0];
            }
            else if(this.count1 >= 20 && this.count2 >= complaints.length + disguisedComplaints.length && !this.dontclick_found) {
                this.button1_message = "Don't click me.";
                this.dontclick_found = true;
            }
            else if(this.count1 == 3) {
                this.button2_show = true;
            }
        },
        click2(e) {
            this.count2++;
            if(this.loop_started){
                if (this.count1 % 10 == 0) {
                    if (this.found_nothing_here) {
                        this.button2_message = "Huh, guess there is something here."
                        this.found_nothing_here = false;
                    }
                    else {

                    }
                }
                else {
                    if (this.found_nothing_here) {
                        this.button2_message = "Still nothing here."
                    }
                    else {
                        this.button2_message = "Nope, nothing here."
                        this.found_nothing_here = true;
                    }
                }
            }
            else if (this.count2 >= complaints.length + disguisedComplaints.length) {
                this.button2_show = false;
            }
            else if (this.count2 >= complaints.length) {
                this.button2_disguised = true;
                this.button2_message = disguisedComplaints[this.count2 - complaints.length];
            }
            else {
                this.button2_message = complaints[this.count2];
            }
        }
    }
}).mount('#app')
