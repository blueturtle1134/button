function timeSinceStart() {
    now = new Date();
    return now.getTime() - start.getTime();
}

const STOP_MESSAGE = "Stop it!"

complaints = [
    "Don't click me.",
    "I said don't click me.",
    "I told you, don't click me.",
    "I mean it.",
    "Stop clicking me.",
    STOP_MESSAGE,
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

function jump_button() {
    var num = 0;
    do {
        num = Math.trunc(Math.random()*9);
    }
    while (app.table1_showbuttons[num])
    app.table1_showbuttons.fill(false);
    app.table1_showbuttons[num] = true;
}

app = Vue.createApp({
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
            button2_disguised: false,
            table1_show: false,
            table1_showbuttons: new Array(9).fill(false),
            table1_messages: new Array(9).fill("Click me!"),
            interval_id: null,
            count3: 0
        }
    },
    methods: {
        click1() {
            this.count1++;
            if(this.dontclick_found) {
                if (this.loop_started){
                    if (this.loop_finished) {
                        if (this.button1_message == STOP_MESSAGE) {
                            clearInterval(this.interval_id);
                        }
                    }
                    else {
                        this.button1_message = complaints[(this.count1 % complaints.length)];
                        if (this.count1 >= 45) {
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
        click2() {
            this.count2++;
            if(this.loop_started){
                if (this.count1 % 10 == 0) {
                    if (this.found_nothing_here) {
                        this.button2_message = "Huh, guess there is something here."
                        this.loop_finished = true;
                        this.found_nothing_here = false;
                        this.table1_show = true;
                        this.interval_id = setInterval(jump_button, 1000);
                    }
                    else {
                            this.button2_message = "Nope, nothing here."
                            this.found_nothing_here = true;
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
        },
        click3(n){
            this.count3++;
            if (this.count3 >= 10) {
                clearInterval(this.interval_id);
                this.table1_showbuttons.fill(true);
                this.table1_messages.fill("Guess!");
                // TODO: Fill out guessing game.
            }
            else {
                clearInterval(this.interval_id);
                this.interval_id = setInterval(jump_button, Math.ceil(500/this.count3));
                jump_button();
            }
        }
    }
}).mount('#app')
