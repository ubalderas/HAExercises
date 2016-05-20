public TestAddRecipients1()
{
	//Test Cases Setup: Creates the necessary test data to be used on each test case.	
	//In this test, I've created two users and two messages.
	//goodUser1 has rights to send messages to anyone. 
	//goodUser2 has rights to be able to receive both messages.
	
	User goodUser1 = new User ("GoodUser1");
	goodUser1.setHasPermissionTOModifyRecipients(true);
	User goodUser2 = new User ("GoodUser2");
	goodUser2.setHasPermissionTOModifyRecipients(true);	
	Message message1 = new Message ("Test 1");
	Message message2 = new Message ("Test 2");
	message1.setAddRecipientAllowed (goodUser2, true);
	message2.setAddRecipientAllowed (goodUser2, true);	
	ArrayList<Message> messages = new ArrayList<Message> ();
	messages.add (message1);
	messages.add (message2);	
	
	
	// Test 1: Add recipients for both messages with goodUser1 as sender and goodUser2 as recipient 
	ArrayList<Message> result1 = rec.AddRecipientToAllMessages(messages, goodUser1, goodUser2);
	
	// Assert that message1 has goodUser2 added as a recipient
	//This assertion would fail, highlighting the bug 2 on the code that checks for successfulMessages to be empty, instead
	//of checking for not being empty.
	// If bug 2 had been fixed however, it would still fail, highlighting bug 3
	assertTrue(message1.getIsAllowedRecipient(goodUser2));
	
	// Assert that message2 has goodUser2 added as a recipient
	//This assertion would fail, highlighting the bug 2 on the code that checks for successfulMessages to be empty, instead
	//of checking for not being empty.
	// If bug 2 had been fixed however, it would still fail, highlighting bug 3
	assertTrue(message2.getIsAllowedRecipient(goodUser2));
	
	// Assert that the result array has no failed messages
	// This assertion would pass
	assertEquals(result.size(), 0);	
	
}

public TestAddRecipients2()
{
	//Test Cases Setup: Creates the necessary test data to be used on this test case.	
	//In this test, I've created two users and two messages.
	//badUser1 has not rights to send messages to anyone. 
	//goodUser2 has rights to be able to receive only the first message.
	
	User badUser1 = new User ("BadUser1");
	badUser1.setHasPermissionTOModifyRecipients(false);
	User goodUser2 = new User ("GoodUser2");
	Message message1 = new Message ("Test 1");
	Message message2 = new Message ("Test 2");
	message1.setAddRecipientAllowed (goodUser2, true);		
	message2.setAddRecipientAllowed (goodUser2, false);
	ArrayList<Message> messages = new ArrayList<Message> ();
	messages.add (message1);
	messages.add (message2);
	
	// Test 2: Add recipients for both messages with badUser1 as both a sender and a recipient 
	ArrayList<Message> result1 = rec.AddRecipientToAllMessages(messages, goodUser1, goodUser2);
	
	// Assert that message1 has goodUser2 added as a recipient:
	// Assuming bug 2 had been fixed, this test would fail, highlighting the bug 1 on the code 
	// that checks if the goodUser2 can receive messages from badUser1, from the canReceiveMessages method	
	assertFalse(message1.getIsAllowedRecipient(goodUser2));		
	
	// Assert that message1 has goodUser2 added as a recipient:
	// Assuming bug 2 had been fixed, this test would fail, highlighting the bug 1 on the code 
	// that checks if the goodUser2 can receive messages from badUser1, from the canReceiveMessages method	
	assertFalse(message2.getIsAllowedRecipient(goodUser2));		
			
}



