export async function onRequestPost(context) {
    const { request } = context;
    
    try {
        // 解析请求体
        const body = await request.json();
        const { targetUrl, method = 'POST', headers = {}, body: requestBody } = body;
        
        if (!targetUrl) {
            return new Response(JSON.stringify({ error: 'Missing targetUrl' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
        }
        
        // 转发请求到目标API
        const response = await fetch(targetUrl, {
            method: method,
            headers: headers,
            body: requestBody ? JSON.stringify(requestBody) : undefined
        });
        
        // 处理流式响应
        if (headers['Accept'] === 'text/event-stream' || 
            (requestBody && requestBody.stream === true)) {
            
            // 创建流式响应
            const stream = new ReadableStream({
                start(controller) {
                    const reader = response.body.getReader();
                    
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                    
                    return pump();
                }
            });
            
            return new Response(stream, {
                status: response.status,
                statusText: response.statusText,
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
        }
        
        // 处理普通响应
        const responseData = await response.text();
        
        return new Response(responseData, {
            status: response.status,
            statusText: response.statusText,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
        
    } catch (error) {
        console.error('Proxy error:', error);
        
        return new Response(JSON.stringify({ 
            error: 'Proxy request failed',
            message: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    }
}

// 处理预检请求
export async function onRequestOptions(context) {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400'
        }
    });
}
