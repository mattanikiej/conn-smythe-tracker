import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wocffshwtgpvkfklfzru.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvY2Zmc2h3dGdwdmtma2xmenJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2OTU1NDYsImV4cCI6MTk5ODI3MTU0Nn0.1-IXYJ7dJWBe2n6Fa2Hs7le_OtbRjDJTnIhkTjYGyC8";
const supabase = createClient(supabaseUrl, supabaseKey);

// sends in a chat from the form
export async function sendChat(username, chatMessage) {
    const { error } = await supabase
        .from("chat")
        .insert([{ username: username, chat: chatMessage }]);

    if (error) {
        console.log(error);
    }
}

// reads the chat from the database
export async function readChat() {
    let { data: chat, error } = await supabase.from("chat").select("*");

    if (error) {
        console.log(error);
    }
    
    return chat;
}
