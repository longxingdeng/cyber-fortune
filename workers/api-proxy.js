// Cloudflare Workers API代理
// 用于处理跨域API请求

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 处理CORS预检请求
  if (request.method === 'OPTIONS') {
    return handleOptions()
  }

  try {
    const url = new URL(request.url)
    
    // 只处理API代理请求
    if (url.pathname !== '/api/proxy') {
      return new Response('Not Found', { status: 404 })
    }

    // 获取请求体
    const body = await request.json()
    const { targetUrl, method = 'GET', headers = {}, body: requestBody } = body

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: '缺少targetUrl参数' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 转发请求到目标API
    const response = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined
    })

    // 处理响应
    const responseData = await response.text()
    
    // 返回响应，添加CORS头
    return new Response(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400'
      }
    })

  } catch (error) {
    console.error('代理请求失败:', error)
    return new Response(JSON.stringify({ 
      error: '代理请求失败', 
      message: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

// 处理CORS预检请求
function handleOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400'
    }
  })
}