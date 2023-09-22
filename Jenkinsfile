

pipeline {
    agent any

    stages {

        stage('NPM Install') {
            steps {
                echo 'Installing npm dependencies'
                bat 'npm install --force'
            }
        }
        stage('Build') {
            steps {
                echo 'Building Project'
                bat 'mvn clean install -P prod'
            }
        }
    }
}
