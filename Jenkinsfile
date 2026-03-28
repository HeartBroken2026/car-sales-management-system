pipeline {
    agent any

    environment {
        DOCKER_USER = "your-dockerhub-username"
        CLIENT_IMAGE = "car-sales-client"
        SERVER_IMAGE = "car-sales-server"
    }

    stages {

        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Server Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/$SERVER_IMAGE ./server'
            }
        }

        stage('Build Client Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/$CLIENT_IMAGE ./client'
            }
        }

        stage('Login DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $DOCKER_USER/$SERVER_IMAGE'
                sh 'docker push $DOCKER_USER/$CLIENT_IMAGE'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}