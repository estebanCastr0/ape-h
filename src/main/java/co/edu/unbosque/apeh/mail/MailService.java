/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.unbosque.apeh.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 *
 * @author Lenovo
 */

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendEmail(String to, String body, String subject){
        SimpleMailMessage message = new SimpleMailMessage();
        
        message.setFrom("jnavas@unbosque.edu.co");
        message.setTo(to);
        message.setText(body);
        message.setSubject(subject);
        
        mailSender.send(message);
    }
}
