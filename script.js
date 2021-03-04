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
            if(count1 == 3) {
                this.button2_show = true;
            }
            else if(count1 >= 20 && count2 >= complaints.length + disguisedComplaints.length && !dontclick_found) {
                this.button1_message = "Don't click me.";
                dontclick_found = true;
            }
            else if(dontclick_found) {
                if(!loop_started) {
                    this.button1_message = "Shoot, you found me.";
                    loop_started = true;
                }
                else if(!loop_finished) {
                    this.button1_message = complaints[(count1 % complaints.length)];
                    if (count1 >= 30) {
                        this.button2_show = true;
                        this.button2_message = "Okay, this is a loop now.";
                    }
                }
            }
        },
        click2() {
            count2++;
            if(count2 < complaints.length) {
                this.button2_message = complaints[count2];
            }
            else if(count2 < complaints.length + disguisedComplaints.length) {
                this.button2_disguised = true;
                this.button2_message = disguisedComplaints[count2 - complaints.length];
            }
            else if(!dontclick_found) {
                this.button2_show = false;
            }
            else {

            }
        }
    }
}).mount('#app')

const complaints = ["Don't click me.",
                    "I said don't click me.",
                    "I told you, don't click me.",
                    "I mean it.",
                    "Stop clicking me.",
                    "Stop it!",
                    "I'm warning you."];
const disguisedComplaints = ["And now you can't.",
                            "Shoot.",
                            "Uhh...",
                            "Thought that would work.",
                            "Can you stop?",
                            "Stop clicking.",
                            "There's nothing to see.",
                            "I'm leaving now."]
count1 = 0;
count2 = 0;
dontclick_found = false;
loop_started = false;
loop_finished = false;
