
```
montagemotion-v4
├─ backend
│  ├─ .dockerignore
│  ├─ .husky
│  │  ├─ pre-commit
│  │  └─ _
│  │     ├─ applypatch-msg
│  │     ├─ commit-msg
│  │     ├─ h
│  │     ├─ husky.sh
│  │     ├─ post-applypatch
│  │     ├─ post-checkout
│  │     ├─ post-commit
│  │     ├─ post-merge
│  │     ├─ post-rewrite
│  │     ├─ pre-applypatch
│  │     ├─ pre-auto-gc
│  │     ├─ pre-commit
│  │     ├─ pre-merge-commit
│  │     ├─ pre-push
│  │     ├─ pre-rebase
│  │     └─ prepare-commit-msg
│  ├─ alldb.sql
│  ├─ docker-compose.yml
│  ├─ Dockerfile
│  ├─ eslint.config.mjs
│  ├─ logs
│  │  └─ winston
│  │     ├─ error
│  │     │  ├─ .56300b5afb95205d00a409bd411777d4517bcf47-audit.json
│  │     │  ├─ .7524f3e3711086718fd13d254c7ad9dfc3f6f271-audit.json
│  │     │  ├─ .7923f07d4b48ed22b2b04a8e784ea2126a410979-audit.json
│  │     │  ├─ .83a6ce93604be4ff93977459ef994ba067ecac15-audit.json
│  │     │  ├─ .8c14a58e88d863cc361f02496be12ed5af10f274-audit.json
│  │     │  ├─ .ce87e85cd223de0e6e0c335f4a8350ab743ef704-audit.json
│  │     │  ├─ error-2025-05-04-12.log
│  │     │  ├─ error-2025-05-04-13.log
│  │     │  ├─ error-2025-05-06-08.log
│  │     │  ├─ error-2025-05-06-09.log
│  │     │  ├─ error-2025-05-06-18.log
│  │     │  ├─ error-2025-05-07-10.log
│  │     │  ├─ error-2025-05-08-04.log
│  │     │  ├─ error-2025-05-08-05.log
│  │     │  ├─ error-2025-05-08-06.log
│  │     │  ├─ error-2025-05-08-07.log.gz
│  │     │  ├─ error-2025-05-08-08.log
│  │     │  ├─ error-2025-05-08-10.log
│  │     │  ├─ error-2025-05-09-19.log.gz
│  │     │  ├─ error-2025-05-09-23.log.gz
│  │     │  ├─ error-2025-05-10-00.log
│  │     │  ├─ error-2025-05-10-06.log
│  │     │  ├─ error-2025-05-10-07.log
│  │     │  ├─ error-2025-05-10-08.log.gz
│  │     │  ├─ error-2025-05-10-10.log
│  │     │  ├─ error-2025-05-10-11.log.gz
│  │     │  ├─ error-2025-05-10-12.log.gz
│  │     │  ├─ error-2025-05-10-13.log.gz
│  │     │  ├─ error-2025-05-10-14.log.gz
│  │     │  ├─ error-2025-05-10-15.log
│  │     │  ├─ error-2025-05-11-08.log.gz
│  │     │  ├─ error-2025-05-11-09.log.gz
│  │     │  ├─ error-2025-05-11-10.log.gz
│  │     │  ├─ error-2025-05-11-11.log.gz
│  │     │  ├─ error-2025-05-12-23.log.gz
│  │     │  ├─ error-2025-05-13-23.log
│  │     │  ├─ error-2025-05-14-02.log.gz
│  │     │  ├─ error-2025-05-14-07.log
│  │     │  ├─ error-2025-05-14-08.log
│  │     │  ├─ error-2025-05-14-09.log.gz
│  │     │  ├─ error-2025-05-14-12.log
│  │     │  ├─ error-2025-05-14-13.log.gz
│  │     │  ├─ error-2025-05-14-14.log
│  │     │  ├─ error-2025-05-15-19.log
│  │     │  ├─ error-2025-05-19-05.log.gz
│  │     │  ├─ error-2025-05-19-06.log.gz
│  │     │  ├─ error-2025-05-19-07.log.gz
│  │     │  ├─ error-2025-05-19-08.log.gz
│  │     │  ├─ error-2025-05-19-09.log
│  │     │  ├─ error-2025-05-20-23.log
│  │     │  ├─ error-2025-05-23-00.log.gz
│  │     │  ├─ error-2025-05-23-01.log
│  │     │  ├─ error-2025-05-23-07.log.gz
│  │     │  ├─ error-2025-05-23-08.log
│  │     │  ├─ error-2025-05-23-09.log
│  │     │  ├─ error-2025-05-23-10.log
│  │     │  ├─ error-2025-05-23-11.log
│  │     │  ├─ error-2025-05-25-07.log
│  │     │  ├─ error-2025-05-25-08.log
│  │     │  ├─ error-2025-05-25-12.log
│  │     │  ├─ error-2025-05-26-03.log.gz
│  │     │  ├─ error-2025-05-26-04.log
│  │     │  ├─ error-2025-05-26-05.log.gz
│  │     │  ├─ error-2025-05-26-07.log.gz
│  │     │  ├─ error-2025-05-26-08.log
│  │     │  ├─ error-2025-05-26-09.log
│  │     │  ├─ error-2025-05-26-11.log.gz
│  │     │  ├─ error-2025-05-26-12.log.gz
│  │     │  ├─ error-2025-05-26-13.log.gz
│  │     │  ├─ error-2025-05-26-14.log
│  │     │  ├─ error-2025-05-26-16.log.gz
│  │     │  ├─ error-2025-05-26-19.log.gz
│  │     │  ├─ error-2025-05-26-20.log
│  │     │  ├─ error-2025-05-27-05.log.gz
│  │     │  ├─ error-2025-05-27-08.log.gz
│  │     │  ├─ error-2025-05-27-09.log
│  │     │  ├─ error-2025-05-27-12.log
│  │     │  ├─ error-2025-05-27-18.log.gz
│  │     │  ├─ error-2025-05-27-19.log
│  │     │  ├─ error-2025-06-25-19.log.gz
│  │     │  ├─ error-2025-06-25-20.log
│  │     │  ├─ error-2025-06-28-08.log
│  │     │  ├─ error-2025-06-28-09.log.gz
│  │     │  ├─ error-2025-06-28-10.log.gz
│  │     │  ├─ error-2025-06-28-11.log
│  │     │  ├─ error-2025-06-28-12.log
│  │     │  ├─ error-2025-07-02-04.log.gz
│  │     │  ├─ error-2025-07-02-05.log.gz
│  │     │  ├─ error-2025-07-02-06.log.gz
│  │     │  ├─ error-2025-08-21-20.log
│  │     │  ├─ error-2025-10-21-01.log
│  │     │  ├─ error-2025-10-22-06.log.gz
│  │     │  ├─ error-2025-10-23-03.log.gz
│  │     │  ├─ error-2025-10-23-07.log.gz
│  │     │  ├─ error-2025-10-24-06.log.gz
│  │     │  ├─ error-2025-10-24-17.log.gz
│  │     │  ├─ error-2025-10-27-19.log.gz
│  │     │  ├─ error-2025-10-30-08.log
│  │     │  ├─ error-2025-10-30-09.log
│  │     │  ├─ error-2025-10-30-20.log
│  │     │  ├─ error-2025-10-31-04.log.gz
│  │     │  ├─ error-2025-10-31-05.log
│  │     │  ├─ error-2025-10-31-06.log
│  │     │  ├─ error-2025-10-31-07.log.gz
│  │     │  ├─ error-2025-10-31-08.log.gz
│  │     │  ├─ error-2025-10-31-09.log.gz
│  │     │  ├─ error-2025-10-31-10.log
│  │     │  ├─ error-2025-10-31-15.log
│  │     │  ├─ error-2025-10-31-18.log.gz
│  │     │  ├─ error-2025-10-31-19.log
│  │     │  ├─ error-2025-10-31-20.log.gz
│  │     │  ├─ error-2025-10-31-22.log
│  │     │  ├─ error-2025-10-31-23.log
│  │     │  ├─ error-2025-11-01-06.log
│  │     │  ├─ error-2025-11-01-07.log
│  │     │  ├─ error-2025-11-01-21.log.gz
│  │     │  ├─ error-2025-11-01-22.log
│  │     │  ├─ error-2025-11-02-08.log
│  │     │  ├─ error-2025-11-05-01.log
│  │     │  ├─ error-2025-11-05-06.log.gz
│  │     │  ├─ error-2025-11-05-07.log
│  │     │  ├─ error-2025-11-05-09.log.gz
│  │     │  ├─ error-2025-11-05-10.log
│  │     │  ├─ error-2025-11-05-11.log
│  │     │  ├─ error-2025-11-05-19.log
│  │     │  ├─ error-2025-11-05-22.log
│  │     │  ├─ error-2025-11-05-23.log
│  │     │  ├─ error-2025-11-06-05.log
│  │     │  ├─ error-2025-11-06-06.log
│  │     │  ├─ error-2025-11-06-20.log
│  │     │  ├─ error-2025-11-06-21.log
│  │     │  ├─ error-2025-11-07-09.log
│  │     │  ├─ error-2025-11-07-14.log
│  │     │  ├─ error-2025-11-07-18.log.gz
│  │     │  ├─ error-2025-11-07-19.log
│  │     │  ├─ error-2025-11-07-20.log
│  │     │  ├─ error-2025-11-07-21.log
│  │     │  ├─ error-2025-11-07-22.log
│  │     │  ├─ error-2025-11-07-23.log
│  │     │  ├─ error-2025-11-08-06.log
│  │     │  ├─ error-2025-11-08-07.log
│  │     │  ├─ error-2025-11-08-15.log.gz
│  │     │  ├─ error-2025-11-08-16.log.gz
│  │     │  ├─ error-2025-11-08-17.log.gz
│  │     │  ├─ error-2025-11-08-18.log.gz
│  │     │  ├─ error-2025-11-08-19.log.gz
│  │     │  ├─ error-2025-11-08-23.log
│  │     │  ├─ error-2025-11-09-08.log
│  │     │  ├─ error-2025-11-09-09.log
│  │     │  ├─ error-2025-11-09-11.log
│  │     │  ├─ error-2025-11-09-14.log
│  │     │  ├─ error-2025-11-09-17.log
│  │     │  ├─ error-2025-11-09-18.log
│  │     │  └─ error-2025-11-11-21.log
│  │     └─ success
│  │        ├─ .1a98e730e345cffaeb8723f706799e5f795d59b3-audit.json
│  │        ├─ .8c8a907c60e3f8e3fd66a52fb410cd5a7a4f767c-audit.json
│  │        ├─ .90770d4c76ec82afb353dbde4ebf06bc6743e631-audit.json
│  │        ├─ .d0f282bc70f2777ea557c12053d8844b467f9393-audit.json
│  │        ├─ .d27ab7253ef1ba6c3dce7221a6aa9dabe20e8f6b-audit.json
│  │        ├─ .fa90c9dc34d16f827bdb8b343a962f35465d10f9-audit.json
│  │        ├─ success-2025-05-04-12.log
│  │        ├─ success-2025-05-04-13.log
│  │        ├─ success-2025-05-06-08.log
│  │        ├─ success-2025-05-06-09.log
│  │        ├─ success-2025-05-06-18.log
│  │        ├─ success-2025-05-07-10.log
│  │        ├─ success-2025-05-08-04.log
│  │        ├─ success-2025-05-08-05.log
│  │        ├─ success-2025-05-08-06.log
│  │        ├─ success-2025-05-08-07.log.gz
│  │        ├─ success-2025-05-08-09.log
│  │        ├─ success-2025-05-08-10.log
│  │        ├─ success-2025-05-09-19.log
│  │        ├─ success-2025-05-10-00.log
│  │        ├─ success-2025-05-10-06.log
│  │        ├─ success-2025-05-10-07.log
│  │        ├─ success-2025-05-10-08.log
│  │        ├─ success-2025-05-10-11.log
│  │        ├─ success-2025-05-10-12.log
│  │        ├─ success-2025-05-10-15.log
│  │        ├─ success-2025-05-11-08.log.gz
│  │        ├─ success-2025-05-12-16.log
│  │        ├─ success-2025-05-12-18.log
│  │        ├─ success-2025-05-12-23.log
│  │        ├─ success-2025-05-13-23.log
│  │        ├─ success-2025-05-14-02.log
│  │        ├─ success-2025-05-14-08.log
│  │        ├─ success-2025-05-14-09.log
│  │        ├─ success-2025-05-14-13.log
│  │        ├─ success-2025-05-14-14.log
│  │        ├─ success-2025-05-15-19.log
│  │        ├─ success-2025-05-19-05.log
│  │        ├─ success-2025-05-19-07.log
│  │        ├─ success-2025-05-20-23.log
│  │        ├─ success-2025-05-23-00.log
│  │        ├─ success-2025-05-23-07.log
│  │        ├─ success-2025-05-23-08.log
│  │        ├─ success-2025-05-23-09.log
│  │        ├─ success-2025-05-23-10.log
│  │        ├─ success-2025-05-23-11.log
│  │        ├─ success-2025-05-25-07.log
│  │        ├─ success-2025-05-25-08.log
│  │        ├─ success-2025-05-25-12.log.gz
│  │        ├─ success-2025-05-25-13.log
│  │        ├─ success-2025-05-26-03.log
│  │        ├─ success-2025-05-26-05.log
│  │        ├─ success-2025-05-26-09.log
│  │        ├─ success-2025-05-26-11.log
│  │        ├─ success-2025-05-26-12.log
│  │        ├─ success-2025-05-26-13.log.gz
│  │        ├─ success-2025-05-26-14.log.gz
│  │        ├─ success-2025-05-26-15.log
│  │        ├─ success-2025-05-26-16.log.gz
│  │        ├─ success-2025-05-26-17.log
│  │        ├─ success-2025-05-26-20.log
│  │        ├─ success-2025-05-27-05.log.gz
│  │        ├─ success-2025-05-27-06.log
│  │        ├─ success-2025-05-27-12.log
│  │        ├─ success-2025-05-27-18.log
│  │        ├─ success-2025-05-27-19.log
│  │        ├─ success-2025-06-25-19.log
│  │        ├─ success-2025-06-25-20.log
│  │        ├─ success-2025-06-28-08.log
│  │        ├─ success-2025-06-28-09.log
│  │        ├─ success-2025-06-28-10.log.gz
│  │        ├─ success-2025-06-28-11.log
│  │        ├─ success-2025-06-28-12.log
│  │        ├─ success-2025-07-02-05.log.gz
│  │        ├─ success-2025-08-21-20.log
│  │        ├─ success-2025-10-21-01.log
│  │        ├─ success-2025-10-22-06.log.gz
│  │        ├─ success-2025-10-22-08.log.gz
│  │        ├─ success-2025-10-23-07.log.gz
│  │        ├─ success-2025-10-23-08.log.gz
│  │        ├─ success-2025-10-24-07.log.gz
│  │        ├─ success-2025-10-24-08.log.gz
│  │        ├─ success-2025-10-24-17.log.gz
│  │        ├─ success-2025-10-27-19.log.gz
│  │        ├─ success-2025-10-30-08.log
│  │        ├─ success-2025-10-30-09.log
│  │        ├─ success-2025-10-30-20.log
│  │        ├─ success-2025-10-31-04.log
│  │        ├─ success-2025-10-31-05.log
│  │        ├─ success-2025-10-31-06.log
│  │        ├─ success-2025-10-31-07.log.gz
│  │        ├─ success-2025-10-31-08.log
│  │        ├─ success-2025-10-31-09.log
│  │        ├─ success-2025-10-31-10.log
│  │        ├─ success-2025-10-31-15.log
│  │        ├─ success-2025-10-31-18.log
│  │        ├─ success-2025-10-31-19.log
│  │        ├─ success-2025-10-31-20.log
│  │        ├─ success-2025-10-31-22.log
│  │        ├─ success-2025-10-31-23.log
│  │        ├─ success-2025-11-01-06.log
│  │        ├─ success-2025-11-01-07.log
│  │        ├─ success-2025-11-01-21.log
│  │        ├─ success-2025-11-01-22.log
│  │        ├─ success-2025-11-02-08.log
│  │        ├─ success-2025-11-05-01.log
│  │        ├─ success-2025-11-05-06.log
│  │        ├─ success-2025-11-05-07.log
│  │        ├─ success-2025-11-05-09.log
│  │        ├─ success-2025-11-05-10.log
│  │        ├─ success-2025-11-05-11.log
│  │        ├─ success-2025-11-05-19.log
│  │        ├─ success-2025-11-05-22.log
│  │        ├─ success-2025-11-05-23.log
│  │        ├─ success-2025-11-06-05.log
│  │        ├─ success-2025-11-06-06.log
│  │        ├─ success-2025-11-06-20.log
│  │        ├─ success-2025-11-06-21.log
│  │        ├─ success-2025-11-07-09.log
│  │        ├─ success-2025-11-07-14.log
│  │        ├─ success-2025-11-07-18.log
│  │        ├─ success-2025-11-07-19.log
│  │        ├─ success-2025-11-07-20.log
│  │        ├─ success-2025-11-07-21.log
│  │        ├─ success-2025-11-07-22.log
│  │        ├─ success-2025-11-07-23.log
│  │        ├─ success-2025-11-08-06.log
│  │        ├─ success-2025-11-08-07.log
│  │        ├─ success-2025-11-08-15.log
│  │        ├─ success-2025-11-08-16.log
│  │        ├─ success-2025-11-08-17.log.gz
│  │        ├─ success-2025-11-08-18.log
│  │        ├─ success-2025-11-09-08.log
│  │        ├─ success-2025-11-09-09.log
│  │        ├─ success-2025-11-09-11.log
│  │        ├─ success-2025-11-09-14.log
│  │        ├─ success-2025-11-09-17.log
│  │        ├─ success-2025-11-09-18.log
│  │        └─ success-2025-11-11-21.log
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ pgadmin_data
│  │  ├─ azurecredentialcache
│  │  ├─ pgadmin4.db
│  │  ├─ sessions
│  │  │  ├─ 514b803c-f74b-4bcd-b6ca-20d16168b12f
│  │  │  ├─ 59680ab0-8913-4a42-8275-5e5dc8f9a451
│  │  │  ├─ 6155f694-eee9-4fc8-a7a0-a3c7ba359653
│  │  │  ├─ 61998b53-4382-440f-a688-d0260a52536b
│  │  │  ├─ 75592047-f558-438b-a067-14b43889ee99
│  │  │  ├─ 7a7b6828-f61c-4473-b222-61f72b19a3a9
│  │  │  ├─ 7b27fbf8-f9b0-4f49-af96-c65aa734d483
│  │  │  ├─ 7f98f30a-ec12-491e-afe0-1d66b3fa699e
│  │  │  ├─ 8361bcb1-4861-4eb1-96c9-b644468db811
│  │  │  ├─ 86fe222a-27a1-4ab0-a9e8-be1d0d30dd2c
│  │  │  ├─ 89f02cd1-1859-49ca-b63c-96ae6bb58ca5
│  │  │  ├─ 99f730de-ec9a-4036-a6bd-86c9b2717bad
│  │  │  ├─ a799658b-48ff-4a97-8580-4c4928284bee
│  │  │  ├─ a8e81738-811c-46f3-9beb-c6b026cb2a53
│  │  │  ├─ c6b6ae6f-5c4f-4d47-ae14-962caeeba567
│  │  │  ├─ e954ccb5-2263-4649-8812-b5b0b00ab2cc
│  │  │  └─ process_logs
│  │  │     ├─ 251108195800334513
│  │  │     │  ├─ err
│  │  │     │  ├─ log_136
│  │  │     │  ├─ out
│  │  │     │  └─ status
│  │  │     ├─ 251108203859668734
│  │  │     │  ├─ err
│  │  │     │  ├─ log_231
│  │  │     │  ├─ out
│  │  │     │  └─ status
│  │  │     └─ 251108205548439943
│  │  │        ├─ err
│  │  │        ├─ log_127
│  │  │        ├─ out
│  │  │        └─ status
│  │  └─ storage
│  │     └─ titumiranan.gtc_gmail.com
│  │        ├─ agin
│  │        ├─ hello
│  │        ├─ new backup
│  │        ├─ newdb
│  │        └─ xxx
│  ├─ README.md
│  ├─ src
│  │  ├─ app
│  │  │  ├─ about
│  │  │  │  ├─ about.controller.ts
│  │  │  │  ├─ about.interface.ts
│  │  │  │  ├─ about.route.ts
│  │  │  │  ├─ about.service.ts
│  │  │  │  ├─ about.zod.ts
│  │  │  │  └─ db.sql
│  │  │  ├─ accese
│  │  │  │  ├─ access.sql
│  │  │  │  ├─ access.ts
│  │  │  │  └─ accesse.interface.ts
│  │  │  ├─ auth
│  │  │  │  ├─ auth.controllers.ts
│  │  │  │  ├─ auth.interface.ts
│  │  │  │  ├─ auth.routes.ts
│  │  │  │  ├─ auth.services.ts
│  │  │  │  ├─ auth.zod.ts
│  │  │  │  └─ user.sql
│  │  │  ├─ blogs
│  │  │  │  ├─ blog.controller.ts
│  │  │  │  ├─ blog.route.ts
│  │  │  │  ├─ blog.services.ts
│  │  │  │  ├─ blog.sql
│  │  │  │  ├─ blog.zod.ts
│  │  │  │  └─ blogs.inteface.ts
│  │  │  ├─ brand_images
│  │  │  │  ├─ brandimage.controller.ts
│  │  │  │  ├─ brandimage.interface.ts
│  │  │  │  ├─ brandimage.route.ts
│  │  │  │  ├─ brandimage.service.ts
│  │  │  │  ├─ brandimage.sql
│  │  │  │  └─ brandimage.zod.ts
│  │  │  ├─ campaign-aplication
│  │  │  │  ├─ campaign.controller.ts
│  │  │  │  ├─ campaign.interface.ts
│  │  │  │  ├─ campaign.route.ts
│  │  │  │  ├─ campaign.services.ts
│  │  │  │  ├─ campaign.zod.ts
│  │  │  │  └─ campaing.sql
│  │  │  ├─ carrerpost
│  │  │  │  ├─ carrer.controller.ts
│  │  │  │  ├─ carrer.interface.ts
│  │  │  │  ├─ carrer.route.ts
│  │  │  │  ├─ carrer.service.ts
│  │  │  │  ├─ carrer.zod.ts
│  │  │  │  └─ db.sql
│  │  │  ├─ contact
│  │  │  │  ├─ conatct.routes.ts
│  │  │  │  ├─ contact.controller.ts
│  │  │  │  ├─ contact.interface.ts
│  │  │  │  ├─ contact.services.ts
│  │  │  │  ├─ contact.zod.ts
│  │  │  │  ├─ db.sql
│  │  │  │  └─ utils.ts
│  │  │  ├─ faq
│  │  │  │  ├─ db.sql
│  │  │  │  ├─ faq.controllers.ts
│  │  │  │  ├─ faq.interfac.ts
│  │  │  │  ├─ faq.routes.ts
│  │  │  │  ├─ faq.services.ts
│  │  │  │  ├─ faq.zod.ts
│  │  │  │  └─ faqitem.service.ts
│  │  │  ├─ header
│  │  │  │  ├─ db.sql
│  │  │  │  ├─ header.controllers.ts
│  │  │  │  ├─ header.interface.ts
│  │  │  │  ├─ header.routes.ts
│  │  │  │  ├─ header.services.ts
│  │  │  │  └─ header.zod.ts
│  │  │  ├─ homeapis
│  │  │  │  ├─ home.service.ts
│  │  │  │  ├─ homeapi.controller.ts
│  │  │  │  └─ homeapi.routes.ts
│  │  │  ├─ member
│  │  │  │  ├─ member.controller.ts
│  │  │  │  ├─ member.interface.ts
│  │  │  │  ├─ member.route.ts
│  │  │  │  ├─ member.service.ts
│  │  │  │  ├─ member.sql
│  │  │  │  └─ member.zod.ts
│  │  │  ├─ pageservice
│  │  │  │  ├─ page_service.controller.ts
│  │  │  │  ├─ page_service.interface.ts
│  │  │  │  ├─ page_service.route.ts
│  │  │  │  ├─ page_service.service.ts
│  │  │  │  ├─ page_service.zod.ts
│  │  │  │  └─ service.sql
│  │  │  ├─ pricing
│  │  │  │  ├─ db.sql
│  │  │  │  ├─ pricing.controller.ts
│  │  │  │  ├─ pricing.interface.ts
│  │  │  │  ├─ pricing.route.ts
│  │  │  │  ├─ pricing.service.ts
│  │  │  │  └─ pricing.zod.ts
│  │  │  ├─ robots
│  │  │  │  ├─ robots.controller.ts
│  │  │  │  ├─ robots.interface.ts
│  │  │  │  ├─ robots.routes.ts
│  │  │  │  ├─ robots.service.ts
│  │  │  │  └─ sitemap.sql
│  │  │  ├─ seo
│  │  │  │  ├─ seo.controller.ts
│  │  │  │  ├─ seo.interface.ts
│  │  │  │  ├─ seo.route.ts
│  │  │  │  ├─ seo.service.ts
│  │  │  │  ├─ seo.sql
│  │  │  │  └─ seo.zod.ts
│  │  │  ├─ services
│  │  │  │  ├─ db.sql
│  │  │  │  ├─ service.controller.ts
│  │  │  │  ├─ service.interface.ts
│  │  │  │  ├─ service.route.ts
│  │  │  │  ├─ service.zod.ts
│  │  │  │  └─ services.service.ts
│  │  │  ├─ sitemap
│  │  │  │  ├─ sitemap.controller.ts
│  │  │  │  ├─ sitemap.interface.ts
│  │  │  │  ├─ sitemap.routes.ts
│  │  │  │  ├─ sitemap.service.ts
│  │  │  │  └─ sitemap.sql
│  │  │  ├─ state
│  │  │  │  ├─ db.sql
│  │  │  │  ├─ state.controller.ts
│  │  │  │  ├─ state.interface.ts
│  │  │  │  ├─ state.routes.ts
│  │  │  │  ├─ state.services.ts
│  │  │  │  └─ state.zod.ts
│  │  │  ├─ testimonial
│  │  │  │  ├─ db.sql
│  │  │  │  ├─ testimonial.controller.ts
│  │  │  │  ├─ testimonial.interface.ts
│  │  │  │  ├─ testimonial.route.ts
│  │  │  │  ├─ testimonial.services.ts
│  │  │  │  └─ testimonial.zod.ts
│  │  │  ├─ upload
│  │  │  │  ├─ upload.controller.ts
│  │  │  │  └─ upload.route.ts
│  │  │  ├─ video-upload
│  │  │  │  ├─ video.controller.ts
│  │  │  │  ├─ video.routes.ts
│  │  │  │  └─ video.services.ts
│  │  │  ├─ website
│  │  │  │  ├─ web.controller.ts
│  │  │  │  ├─ web.route.ts
│  │  │  │  └─ web.service.ts
│  │  │  ├─ whychooseus
│  │  │  │  ├─ whychooseus.controller.ts
│  │  │  │  ├─ whychooseus.interface.ts
│  │  │  │  ├─ whychooseus.route.ts
│  │  │  │  ├─ whychooseus.service.ts
│  │  │  │  ├─ whychooseus.sql
│  │  │  │  └─ whychooseus.zod.ts
│  │  │  ├─ work
│  │  │  │  ├─ db.sql
│  │  │  │  ├─ wok.zod.ts
│  │  │  │  ├─ work.contrller.ts
│  │  │  │  ├─ work.interface.ts
│  │  │  │  ├─ work.route.ts
│  │  │  │  └─ workservice.ts
│  │  │  └─ working_process
│  │  │     ├─ proccess.sql
│  │  │     ├─ process.controller.ts
│  │  │     ├─ process.interface.ts
│  │  │     ├─ process.route.ts
│  │  │     ├─ process.service.ts
│  │  │     └─ process.zod.ts
│  │  ├─ app.ts
│  │  ├─ config
│  │  │  └─ index.ts
│  │  ├─ db
│  │  │  └─ db.ts
│  │  ├─ logger
│  │  │  └─ logger.ts
│  │  ├─ main.route.ts
│  │  ├─ midleware
│  │  │  ├─ asyncHandler.ts
│  │  │  ├─ authMidleware.ts
│  │  │  ├─ globalErrorHandler.ts
│  │  │  ├─ invalideroute.ts
│  │  │  ├─ jwtHelper.ts
│  │  │  └─ validate.ts
│  │  ├─ r2objectConfig
│  │  │  ├─ getUploadUrl.ts
│  │  │  ├─ multerupload.ts
│  │  │  └─ r2.ts
│  │  └─ utils
│  │     ├─ ApiError.ts
│  │     ├─ checkUser.ts
│  │     ├─ generateVerificationCode.ts
│  │     ├─ requireRole.ts
│  │     ├─ responseHandler.ts
│  │     └─ sendVerificationEmail.ts
│  ├─ src.zip
│  ├─ tsconfig.json
│  └─ yarn.lock
├─ frontend
│  ├─ app
│  │  ├─ (company)
│  │  │  ├─ portfolio
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ Portfoliotab.tsx
│  │  │  ├─ privacy-policy
│  │  │  │  └─ page.tsx
│  │  │  ├─ refund-policy
│  │  │  │  └─ page.tsx
│  │  │  └─ terms-and-conditions
│  │  │     └─ page.tsx
│  │  ├─ (services)
│  │  │  ├─ podcast-editing-service
│  │  │  │  ├─ OurWork.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ PodacastMarquee.tsx
│  │  │  │  ├─ PodacstHeader.tsx
│  │  │  │  ├─ PodcastPlanwithpurpose.tsx
│  │  │  │  ├─ PodcastPricing.tsx
│  │  │  │  ├─ PodcastProcess.tsx
│  │  │  │  ├─ PodcastPurposestep.tsx
│  │  │  │  ├─ PodcastService.tsx
│  │  │  │  ├─ PodcastSldder.tsx
│  │  │  │  ├─ PodcastWhychooseus.tsx
│  │  │  │  └─ VerticalSlide.tsx
│  │  │  ├─ saas-explainer-video
│  │  │  │  ├─ Headerpopup.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ SaasHeader.tsx
│  │  │  │  ├─ SaasMarquee.tsx
│  │  │  │  ├─ SaasProcess.tsx
│  │  │  │  ├─ SaasService.tsx
│  │  │  │  ├─ SaasThirdSection.tsx
│  │  │  │  ├─ SaasWorksection.tsx
│  │  │  │  └─ WhySassVideo.tsx
│  │  │  ├─ short-form-video-editing
│  │  │  │  ├─ MinishortvideoPlayer.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ ShortsHeader.tsx
│  │  │  │  ├─ ShortsWorks.tsx
│  │  │  │  └─ VerticalMarqueeSlider.tsx
│  │  │  ├─ talking-head-video
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ TalkingHeadChooseus.tsx
│  │  │  │  ├─ TalkingHeader.tsx
│  │  │  │  ├─ TalkingHeadPlanPurpose.tsx
│  │  │  │  ├─ TalkingHeadPricing.tsx
│  │  │  │  ├─ TalkingHeadprocess.tsx
│  │  │  │  ├─ TalkingHeadWork.tsx
│  │  │  │  └─ TalkingService.tsx
│  │  │  ├─ thumbnail-design
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ Thumbnailheader.tsx
│  │  │  │  ├─ Thumbnailworksection.tsx
│  │  │  │  └─ Verticalheader.tsx
│  │  │  └─ [serviceurl]
│  │  ├─ -loading.tsx
│  │  ├─ about-us
│  │  │  ├─ InsideMontage.tsx
│  │  │  ├─ OurMission.tsx
│  │  │  ├─ OurStory.tsx
│  │  │  ├─ OurTeam.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ StorySlider.tsx
│  │  ├─ blog
│  │  │  ├─ Blogcard.tsx
│  │  │  ├─ Blogtab.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]
│  │  │     ├─ BlogHeader.tsx
│  │  │     ├─ page.tsx
│  │  │     └─ ShareButtons.tsx
│  │  ├─ careers
│  │  │  ├─ CareersHeader.tsx
│  │  │  ├─ JobPost.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ WhyjoinMontagemotion.tsx
│  │  ├─ contact-us
│  │  │  ├─ CalendlyContact.tsx
│  │  │  ├─ contact.css
│  │  │  ├─ FirstSection.tsx
│  │  │  ├─ Locationsection.tsx
│  │  │  └─ page.tsx
│  │  ├─ error.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ page.tsx
│  │  ├─ Provider.tsx
│  │  ├─ robots.ts
│  │  ├─ services
│  │  │  └─ [url]
│  │  │     └─ page.tsx
│  │  └─ sitemap.tsx
│  ├─ app.zip
│  ├─ component
│  │  ├─ about
│  │  │  ├─ Brand.tsx
│  │  │  ├─ Header.tsx
│  │  │  └─ Reactplayer.tsx
│  │  ├─ admin
│  │  │  └─ JsonEditor.tsx
│  │  ├─ Aosinit.tsx
│  │  ├─ Followercursor.tsx
│  │  ├─ home
│  │  │  ├─ BookaCallSection.tsx
│  │  │  ├─ BulletPoint.tsx
│  │  │  ├─ ColumnCard.tsx
│  │  │  ├─ DynamicWorkContent.tsx
│  │  │  ├─ FaqSection.tsx
│  │  │  ├─ FeatureProject.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Headervideocard.tsx
│  │  │  ├─ Headervideopop.tsx
│  │  │  ├─ HomeProjectTab.tsx
│  │  │  ├─ OurFeatureProject.tsx
│  │  │  ├─ OurProcess.tsx
│  │  │  ├─ PatnersSection.tsx
│  │  │  ├─ PrettyPlayer.tsx
│  │  │  ├─ PriceComparison.tsx
│  │  │  ├─ PriceSection.tsx
│  │  │  ├─ PulseIcon
│  │  │  │  ├─ Pluseicon.module.css
│  │  │  │  └─ PluseIcon.tsx
│  │  │  ├─ ServiceSections.tsx
│  │  │  ├─ ShortVideoPlayer.tsx
│  │  │  ├─ Softcursor.tsx
│  │  │  ├─ TurstedBy.tsx
│  │  │  └─ WhyChooseUs.tsx
│  │  ├─ poadcast
│  │  ├─ share
│  │  │  ├─ Accordion.tsx
│  │  │  ├─ ContactForm.tsx
│  │  │  ├─ ContactSection.tsx
│  │  │  ├─ CounterNumber.tsx
│  │  │  ├─ CurveGlow.tsx
│  │  │  ├─ CustomLink.tsx
│  │  │  ├─ FaqSection.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ getPageSEO.tsx
│  │  │  ├─ Gradientcard.tsx
│  │  │  ├─ Headering.tsx
│  │  │  ├─ IndustriesWork.tsx
│  │  │  ├─ IndustryTabClient.tsx
│  │  │  ├─ IndustryWork.tsx
│  │  │  ├─ MobileMenu.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  ├─ PricingCard.tsx
│  │  │  ├─ ServiceDropdown.tsx
│  │  │  ├─ SkeletonLoader.module.css
│  │  │  ├─ Tabcontainer.tsx
│  │  │  ├─ Testimonial.tsx
│  │  │  ├─ TestimonialSkeleton.tsx
│  │  │  ├─ TextTestimonial.tsx
│  │  │  ├─ Timeline.tsx
│  │  │  └─ Videotestimonial.tsx
│  │  ├─ skeleton
│  │  │  └─ MheaderSkeleton.tsx
│  │  ├─ talking-head
│  │  └─ Testimonial
│  │     ├─ styles.module.css
│  │     └─ Testimonila.tsx
│  ├─ components
│  │  └─ ui
│  │     ├─ 3d-card.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ dialog.tsx
│  │     ├─ shadcn-io
│  │     │  └─ counting-number
│  │     │     └─ index.tsx
│  │     ├─ slider.tsx
│  │     └─ tabs.tsx
│  ├─ components.json
│  ├─ hook
│  │  ├─ Apiurl.tsx
│  │  ├─ functions
│  │  │  ├─ fetchabout.ts
│  │  │  ├─ fetchBlog.ts
│  │  │  ├─ fetchHomeapi.ts
│  │  │  ├─ fetchShortapi.ts
│  │  │  └─ fetchsingleBlog.ts
│  │  ├─ useAboutHeader.tsx
│  │  ├─ useBlogs.tsx
│  │  ├─ useBlogsingle.tsx
│  │  ├─ useFaq.tsx
│  │  ├─ useHomeApi.tsx
│  │  ├─ useService.tsx
│  │  ├─ useTestimonial.tsx
│  │  └─ useWorks.tsx
│  ├─ lib
│  │  └─ utils.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ assets
│  │  │  ├─ brand
│  │  │  │  ├─ airtel.png
│  │  │  │  ├─ amazon.png
│  │  │  │  ├─ gucci.png
│  │  │  │  ├─ honor.png
│  │  │  │  ├─ nogod.png
│  │  │  │  ├─ oppo.png
│  │  │  │  ├─ pran.png
│  │  │  │  └─ rfl.png
│  │  │  ├─ career
│  │  │  │  ├─ user-1.png
│  │  │  │  ├─ user-2.png
│  │  │  │  ├─ user-3.png
│  │  │  │  ├─ user-4.png
│  │  │  │  ├─ user-5.png
│  │  │  │  └─ user-6.png
│  │  │  ├─ comma.png
│  │  │  ├─ discover.png
│  │  │  ├─ dollar.png
│  │  │  ├─ edit.png
│  │  │  ├─ faq.png
│  │  │  ├─ file-video.png
│  │  │  ├─ gallary
│  │  │  │  ├─ image-1.png
│  │  │  │  ├─ image-2.png
│  │  │  │  ├─ image-3.png
│  │  │  │  ├─ image-4.png
│  │  │  │  ├─ image-5.png
│  │  │  │  └─ image-6.png
│  │  │  ├─ Group 1000011820.png
│  │  │  ├─ herothumbnail.png
│  │  │  ├─ hero_client-1.png
│  │  │  ├─ hero_client-2.png
│  │  │  ├─ hero_client-3.png
│  │  │  ├─ hero_client-4.png
│  │  │  ├─ icon
│  │  │  │  ├─ arrow-right-01.png
│  │  │  │  ├─ author.png
│  │  │  │  ├─ certificate.png
│  │  │  │  ├─ clock-01.png
│  │  │  │  ├─ date.png
│  │  │  │  ├─ facebook.png
│  │  │  │  ├─ fb.png
│  │  │  │  ├─ From-fillup.pdf
│  │  │  │  ├─ gmail.png
│  │  │  │  ├─ Hons-2nd-year-Exam-2024-Notice.pdf
│  │  │  │  ├─ insta.png
│  │  │  │  ├─ link.png
│  │  │  │  ├─ logo.png
│  │  │  │  ├─ playsmall.png
│  │  │  │  ├─ users.png
│  │  │  │  ├─ video-cut.png
│  │  │  │  ├─ whatsapp.png
│  │  │  │  └─ yt.png
│  │  │  ├─ industries.png
│  │  │  ├─ industriesworok.png
│  │  │  ├─ location.png
│  │  │  ├─ menu.png
│  │  │  ├─ montagelogo.png
│  │  │  ├─ patner
│  │  │  │  ├─ airtel.png
│  │  │  │  ├─ amzon.png
│  │  │  │  ├─ guci.png
│  │  │  │  ├─ honor.png
│  │  │  │  ├─ nogad.png
│  │  │  │  ├─ oppo.png
│  │  │  │  ├─ parn.png
│  │  │  │  └─ rfl.png
│  │  │  ├─ playbutton.png
│  │  │  ├─ podcast
│  │  │  │  ├─ greatpodcast.png
│  │  │  │  ├─ header-1.png
│  │  │  │  ├─ header-2.png
│  │  │  │  ├─ header-3.png
│  │  │  │  ├─ header-4.png
│  │  │  │  ├─ marquee
│  │  │  │  │  ├─ icon-10.jpg
│  │  │  │  │  ├─ icon-2.png
│  │  │  │  │  ├─ icon-3.png
│  │  │  │  │  ├─ icon-4.png
│  │  │  │  │  ├─ icon-5.png
│  │  │  │  │  ├─ icon-6.png
│  │  │  │  │  ├─ icon-7.jpg
│  │  │  │  │  ├─ icon-8.png
│  │  │  │  │  ├─ icon-9.png
│  │  │  │  │  └─ piaggio.png
│  │  │  │  └─ process.png
│  │  │  ├─ review.png
│  │  │  ├─ sass
│  │  │  │  └─ saascustomer.png
│  │  │  ├─ services
│  │  │  │  ├─ musicvideo.png
│  │  │  │  ├─ podcast.png
│  │  │  │  ├─ promo.png
│  │  │  │  ├─ shorts.png
│  │  │  │  ├─ talking.png
│  │  │  │  └─ thumbnail.png
│  │  │  ├─ shorts
│  │  │  ├─ strategy.png
│  │  │  └─ thubnail
│  │  │     └─ hero_client-2.png
│  │  ├─ homepage.json
│  │  ├─ robots-data.json
│  │  └─ sitemap-data.json
│  ├─ README.md
│  ├─ robots.txt
│  ├─ tailwind.config.ts
│  ├─ tsconfig.json
│  └─ utils
│     ├─ api.json
│     └─ getData.ts
├─ new backup
└─ pgadmin
   ├─ docker-compose.yml
   └─ pgadmin_data
      ├─ azurecredentialcache
      ├─ pgadmin4.db
      ├─ sessions
      │  ├─ 53402fcf-3c3d-4f1b-b0d7-f05ac3cfc81a
      │  └─ process_logs
      │     ├─ 251108195034482698
      │     └─ 251108204510747131
      └─ storage
         └─ titumiranan.gtc_gmail.com
            ├─ newdb
            └─ xxx

```