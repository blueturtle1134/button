count1 = 0;
count2 = 0;
dontclick_found = false;
loop_started = false;
loop_finished = false;
start = new Date();

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
            button1_show: true,
            button1_message: "Click me!",
            button2_show: false,
            button2_message: "Don't click me.",
            button2_disguised: false
        }
    },
    methods: {
        click1() {
            count1++;
            if(dontclick_found) {
                if (loop_started){
                    if (loop_finished) {
                        // TODO: more
                    }
                    else {
                        this.button1_message = complaints[(count1 % complaints.length)];
                        if (count1 >= 30) {
                            this.button2_show = true;
                            this.button2_message = "Okay, this is a loop now.";
                        }
                    }
                }
                else {
                    this.button1_message = "Shoot, you found me.";
                    loop_started = true;
                }
            }
            else if(count1 >= 4*5*60 && timeSinceStart() >= 5*1000*60 && count2 == 0) {
                complaints = non_complaints;
                this.button2_message = complaints[0];
            }
            else if(count1 >= 20 && count2 >= complaints.length + disguisedComplaints.length && !dontclick_found) {
                this.button1_message = "Don't click me.";
                dontclick_found = true;
            }
            else if(count1 == 3) {
                this.button2_show = true;
            }
        },
        click2() {
            count2++;
            if(dontclick_found){
                // TODO: more
            }
            else if (count2 >= complaints.length + disguisedComplaints.length) {
                this.button2_show = false;
            }
            else if (count2 >= complaints.length) {
                this.button2_disguised = true;
                this.button2_message = disguisedComplaints[count2 - complaints.length];
            }
            else {
                this.button2_message = complaints[count2];
            }
        }
    }
}).mount('#app')
