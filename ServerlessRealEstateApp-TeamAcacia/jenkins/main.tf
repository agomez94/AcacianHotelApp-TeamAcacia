terraform {
  required_providers {
    aws = {
        source  = "hashicorp/aws"
        version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "jenkins-TA" {
  ami = "ami-0bc24491750785f09"
  instance_type = "t3.micro"

  tags = {
    Name = "team-acacia-jenkins-ec2"
  }
}

resource "aws_security_group" "jenkins-TA-SG" {
    name        = "jenkins-ta-sg"
    vpc_id      = "vpc-099a52cf10ca88ca0"
    description = "Allow ssh and HTTP traffic"

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 8080
        to_port     = 8080
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}