pipeline {
    agent any

    environment {
        DOCKER_USER   = "notmuwafaq"
        CLIENT_IMAGE  = "car-sales-client"
        SERVER_IMAGE  = "car-sales-server"
        IMAGE_TAG     = "${BUILD_NUMBER}"
    }

    stages {

        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                docker build -t $DOCKER_USER/$SERVER_IMAGE:$IMAGE_TAG ./server
                docker build -t $DOCKER_USER/$CLIENT_IMAGE:$IMAGE_TAG ./client
                '''
            }
        }

        stage('Docker Login') {
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
                sh '''
                docker push $DOCKER_USER/$SERVER_IMAGE:$IMAGE_TAG
                docker push $DOCKER_USER/$CLIENT_IMAGE:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                    # Apply base manifests (only needed if YAML changed)
                    kubectl apply -f k8s/

                    # Update images explicitly (THIS is what actually deploys new version)
                    kubectl set image deployment/server server=$DOCKER_USER/$SERVER_IMAGE:$IMAGE_TAG
                    kubectl set image deployment/client client=$DOCKER_USER/$CLIENT_IMAGE:$IMAGE_TAG

                    # Wait for rollout (fail pipeline if broken)
                    kubectl rollout status deployment/server
                    kubectl rollout status deployment/client
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo "❌ Deployment failed. Check logs using: kubectl logs"
        }
        success {
            echo "✅ Deployment successful with tag: ${IMAGE_TAG}"
        }
    }
}