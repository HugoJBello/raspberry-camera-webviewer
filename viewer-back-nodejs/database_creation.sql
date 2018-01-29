create database if not exists picam_app;

use picam_app;

drop table if exists image;

create table if not exists image(
   id INT NOT NULL AUTO_INCREMENT,
	date_taken DATETIME,
	path VARCHAR(500),
	filename VARCHAR(100),
	camera_id VARCHAR(300),
	camera_ip VARCHAR(300),
	PRIMARY KEY (id) );

# alter table image
# add camera_id VARCHAR(300),
# add	camera_ip VARCHAR(300);

insert into image (date_taken,path,filename) values (sysdate(),"C:/Users/HJBG/1.jpeg","1.jpeg");
insert into image (date_taken,path,filename) values (sysdate(),"C:/Users/HJBG/2.jpeg","2.jpeg");
insert into image (date_taken,path,filename) values (sysdate(),"C:/Users/HJBG/3.jpeg","3.jpeg");
insert into image (date_taken,path,filename) values (sysdate(),"C:/Users/HJBG/kitty-cat-kitten-pet-45201.jpeg","kitty-cat-kitten-pet-45201.jpeg");
insert into image (date_taken,path,filename) values (sysdate(),"C:/Users/HJBG/kitty-cat-kitten-pet-45201.jpeg","kitty-cat-kitten-pet-45201.jpeg");

 select * from image;
# order by date_taken desc
# LIMIT 5;

# select * from image where date_taken = "2017-12-28" limit 3;
