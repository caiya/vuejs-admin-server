# oAuthCenter

nodejs OAuth authorization server implements based on eggjs

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

### 测试图片

下面是code模板测试的完整流程：

![](https://raw.githubusercontent.com/caiya/imgs/c369910fbff2422fa6a705b4208907bdc1dd2334/%E5%AD%90%E7%B3%BB%E7%BB%9F%E7%99%BB%E5%BD%95.jpg)

然后是点击登录按钮进行跳转：

![](https://raw.githubusercontent.com/caiya/imgs/c369910fbff2422fa6a705b4208907bdc1dd2334/oAuth%E7%BB%9F%E4%B8%80%E7%99%BB%E5%BD%95%E9%A1%B5.jpg)

注意：跳转过去携带了client_id等信息，然后是oAuth登录授权：

![](https://raw.githubusercontent.com/caiya/imgs/c369910fbff2422fa6a705b4208907bdc1dd2334/oAuth%E7%BB%9F%E4%B8%80%E7%99%BB%E5%BD%95%E9%A1%B5.jpg)

最后是授权成功，回跳回来子系统指定的回调地址：

![](https://raw.githubusercontent.com/caiya/imgs/c369910fbff2422fa6a705b4208907bdc1dd2334/oAuth%E7%99%BB%E5%BD%95%E6%88%90%E5%8A%9F%E8%BF%94%E5%9B%9E.jpg)

![](https://raw.githubusercontent.com/caiya/imgs/8850b1b9e336d3774cf924cf8611267db95442e2/%E7%94%A8%E6%88%B7%E5%8F%8Aclient%E6%B3%A8%E5%86%8C.png)

![](https://raw.githubusercontent.com/caiya/imgs/8850b1b9e336d3774cf924cf8611267db95442e2/%E4%BD%BF%E7%94%A8password%E6%A8%A1%E5%BC%8F%E8%8E%B7%E5%8F%96access_token.png)

![](https://raw.githubusercontent.com/caiya/imgs/8850b1b9e336d3774cf924cf8611267db95442e2/password%20grant%E4%B8%8B%E9%94%99%E8%AF%AF%E7%9A%84%E5%AF%86%E7%A0%81.png)

![](https://raw.githubusercontent.com/caiya/imgs/8850b1b9e336d3774cf924cf8611267db95442e2/%E6%A8%A1%E6%8B%9Fauthorization_code%E6%A8%A1%E5%BC%8F%EF%BC%8C%E8%AF%B7%E6%B1%82token.png)

![](https://raw.githubusercontent.com/caiya/imgs/8850b1b9e336d3774cf924cf8611267db95442e2/%E9%94%99%E8%AF%AF%E7%9A%84refresh_token.png)

![](https://raw.githubusercontent.com/caiya/imgs/8850b1b9e336d3774cf924cf8611267db95442e2/%E4%BD%BF%E7%94%A8refresh_token%E8%AF%B7%E6%B1%82%E6%96%B0%E7%9A%84access_token.png)

![](https://raw.githubusercontent.com/caiya/imgs/8850b1b9e336d3774cf924cf8611267db95442e2/%E8%8E%B7%E5%8F%96%E5%88%B0token%E5%90%8E%EF%BC%8C%E6%B7%BB%E5%8A%A0Bearer%20token%E6%9D%A5%E8%AF%B7%E6%B1%82%E5%90%8E%E7%BB%AD%E6%89%80%E6%9C%89API%E6%8E%A5%E5%8F%A3.png)

![](https://raw.githubusercontent.com/caiya/imgs/8850b1b9e336d3774cf924cf8611267db95442e2/%E9%94%99%E8%AF%AF%E7%9A%84token.png)


[egg]: https://eggjs.org