create database if not exists picam_app;

use picam_app;

drop table if exists image;
drop table if exists camera;


create table if not exists camera(
	camera_id VARCHAR(300),
	date_added DATETIME,
	info VARCHAR(900),
	PRIMARY KEY (camera_id) );

create table if not exists image(
   id INT NOT NULL AUTO_INCREMENT,
	date_taken DATETIME,
	path VARCHAR(500),
	filename VARCHAR(100),
	camera_id VARCHAR(300),
	camera_ip VARCHAR(300),
	FOREIGN KEY (camera_id) REFERENCES camera(camera_id),
	PRIMARY KEY (id) );

# alter table image
# add camera_id VARCHAR(300),
# add	camera_ip VARCHAR(300);

insert into camera (camera_id) values ("camera1");
insert into camera (camera_id) values ("camera2");

insert into image (date_taken,path,filename,camera_id,camera_ip)
 values (sysdate(),"C:/Users/HJBG/1.jpeg","1.jpeg","camera1","192.168.1");

 insert into image (date_taken,path,filename,camera_id,camera_ip)
 values (sysdate(),"C:/Users/HJBG/2.jpeg","2.jpeg","camera2","192.168.2");


 select * from image;
 select * from camera;
# order by date_taken desc
# LIMIT 5;

# select * from image where date_taken = "2017-12-28" limit 3;
