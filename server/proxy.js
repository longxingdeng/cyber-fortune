// 在你的后端服务器代码中
const express = require('express');
const axios = require('axios'); // 或者使用 node-fetch
const path = require('path');
const app = express();

// 优先提供静态文件
app.use(express.static(path.join(__dirname, '..')));

app.use(express.json());
 
// 新增：获取模型列表的接口
app.get('/api/models', async (req, res) => {
  const { targetUrl, apiKey } = req.query;

  if (!targetUrl || !targetUrl.startsWith('http') || !apiKey) {
    return res.status(400).json({ error: 'Invalid target URL or missing API key' });
  }

  try {
    const modelsResponse = await axios.get(new URL('/v1/models', targetUrl).href, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    res.json(modelsResponse.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Failed to fetch models' });
  }
});

// 创建一个代理接口
app.post('/api/proxy', async (req, res) => {
  const { targetUrl, method, headers, body } = req.body;
 
  // 基本的安全校验：确保 targetUrl 是一个合法的 URL
  if (!targetUrl || !targetUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid target URL' });
  }
 
  try {
    // 服务器代替客户端去请求外部 API
    const response = await axios({
      method: method || 'POST', // 默认 POST
      url: targetUrl,
      data: body,
      headers: {
        // 你可以决定哪些 header 需要透传
        'Content-Type': headers['Content-Type'] || 'application/json',
        // 注意：不要直接把用户的 Authorization 头转发，除非你确信这是安全的
        'Authorization': headers['Authorization']
      }
    });
    
    // 检查响应类型，只转发 JSON
    const contentType = response.headers['content-type'];
    if (contentType && contentType.includes('application/json')) {
      res.status(response.status).json(response.data);
    } else {
      res.status(400).json({ error: 'Received non-JSON response from target server. Please check the API endpoint.' });
    }
 
  } catch (error) {
    // 错误处理
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Proxy request failed' });
  }
});
 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server with proxy is running on port ${port}`));